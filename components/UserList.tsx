'use client';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils';
import { fetchUsers } from '@/utils/fetchUsers';
import { User } from '@/types/user';
import {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import Searchbar from './Searchbar';
import Link from 'next/link';

const USERS_PER_PAGE = 10;

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [search, setSearch] = useState(searchParams.get('query') || '');

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * USERS_PER_PAGE,
    page * USERS_PER_PAGE
  );

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
    const newUrl = value
      ? formUrlQuery({
          params: searchParams.toString(),
          key: 'query',
          value,
        })
      : removeKeysFromUrlQuery({
          params: searchParams.toString(),
          keysToRemove: ['query'],
        });
    router.push(newUrl, { scroll: false });
  };

  const renderPageNumbers = () => {
    const items = [];

    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationLink
            key={i}
            isActive={page === i}
            onClick={() => setPage(i)}
            href="#"
          >
            {i}
          </PaginationLink>
        );
      }
    } else {
      items.push(
        <PaginationLink
          key={1}
          isActive={page === 1}
          onClick={() => setPage(1)}
          href="#"
        >
          1
        </PaginationLink>
      );

      if (page > 2) {
        items.push(<PaginationEllipsis key="start-ellipsis" />);
      }
      if (page !== 1 && page !== totalPages) {
        items.push(
          <PaginationLink
            key={page}
            isActive={true}
            onClick={() => setPage(page)}
            href="#"
          >
            {page}
          </PaginationLink>
        );
      }
      if (page < totalPages - 1) {
        items.push(<PaginationEllipsis key="end-ellipsis" />);
      }
      items.push(
        <PaginationLink
          key={totalPages}
          isActive={page === totalPages}
          onClick={() => setPage(totalPages)}
          href="#"
        >
          {totalPages}
        </PaginationLink>
      );
    }

    return items;
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">User List</h2>
      <Searchbar value={search} onChange={handleSearch} />
<ul className="divide-y divide-gray-200 mb-6">
  {paginatedUsers.map((user) => (
    <li key={user.id} className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <Link
        href={`/users/${user.id}`}
        className="font-semibold text-gray-800 hover:text-blue-600 transition"
      >
        {user.name}
      </Link>
      <span className="text-gray-500">{user.email}</span>
    </li>
  ))}
</ul>
      <Pagination>
        <PaginationContent>
          <PaginationPrevious
            onClick={() => setPage(page > 1 ? page - 1 : 1)}
            href="#"
          />
          {renderPageNumbers()}
          <PaginationNext
            onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
            href="#"
          />
        </PaginationContent>
      </Pagination>
    </div>
  );
}
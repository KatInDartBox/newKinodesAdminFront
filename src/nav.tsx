import { Link } from "wouter";

export default function Nav() {
  return (
    <div>
      <ul className="flex items-center">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/user">User</Link>
        </li>

        <li>
          <Link href="/user/error">error</Link>
        </li>
      </ul>
    </div>
  );
}

import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../../lib/auth";

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?redirect=/profile&reason=login");

  const { name, email } = session.user;

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <div className="rounded-2xl border border-green-100 bg-white p-6 text-center shadow-sm">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-600 text-3xl text-white">
          {name.charAt(0).toUpperCase()}
        </div>
        <h1 className="mt-4 text-2xl font-bold">{name}</h1>
        <p className="text-sm text-base-content/60">{email}</p>
        <Link
          href="/profile/update"
          className="btn btn-success mt-5 text-white"
        >
          তথ্য আপডেট করুন
        </Link>
      </div>
    </div>
  );
}

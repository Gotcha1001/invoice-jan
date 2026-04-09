import { signOut } from "@/auth";
import { requireUser } from "@/hooks/hooks";

export default async function Dashboard() {
  const session = await requireUser();
  return (
    <div className="h-screen w-full gradient-background2 flex flex-col justify-center items-center">
      <h1 className="gradient-title text-4xl">Dashboard</h1>
      <div className="mt-10">
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button className="p-3 bg-amber-300 rounded-lg" type="submit">
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );
}

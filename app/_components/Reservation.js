import { auth } from "../_lib/auth";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

export default async function Reservation() {
  const session = await auth();
  return (
    <div className="grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector />
      <ReservationForm user={session?.user ?? null} />
    </div>
  );
}

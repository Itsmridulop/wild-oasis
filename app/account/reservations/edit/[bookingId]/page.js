import UpdateReservationForm from "@/app/_components/UpdateReservationForm";
import { getBooking } from "@/app/_lib/data-service";

export default async function Page({ params }) {
  const booking = await getBooking(params.bookingId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{booking._id}
      </h2>

      <UpdateReservationForm booking={booking} />
    </div>
  );
}

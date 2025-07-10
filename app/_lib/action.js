"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { updateMe } from "./data-service";
import axios from "axios";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateProfile(formData) {
  const session = await auth();
  if (!session)
    throw new Error("You must be logged in to update your profile.");
  const { nationality, nationalID } = Object.fromEntries(formData);
  const countryData = nationality.split("%");
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Invalid country code");
  const updatedData = {
    email: session.user.email,
    nationalID,
    nationality: countryData[0],
    countryFlag: countryData[1],
  };
  const res = await updateMe(updatedData);
  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session)
    throw new Error("You must be logged in to delete a reservation.");
  await axios.delete(`http://localhost:8000/api/v1/bookings/${bookingId}`, {
    params: {
      email: session.user.email,
    },
  });
  revalidatePath("/account/reservations");
}

export async function updateReservation(formData) {
  const bookingId = formData.get("bookingId");
  const session = await auth();
  if (!session)
    throw new Error("You must be logged in to delete a reservation.");
  const updateData = {
    observations: formData.get("observations"),
    numGuests: formData.get("numGuests"),
  };

  await axios.patch(
    `http://localhost:8000/api/v1/bookings/${bookingId}`,
    updateData,
    {
      params: {
        email: session.user.email,
      },
    },
  );
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  redirect("/account/reservations");
}

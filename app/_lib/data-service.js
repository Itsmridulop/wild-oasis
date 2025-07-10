import axios from "axios";
import { notFound } from "next/navigation";
import { auth } from "./auth";
export async function getCountries() {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag",
    );
    const countries = await res.json();
    return countries;
  } catch {
    throw new Error("Could not fetch countries");
  }
}

export async function getCabins() {
  try {
    const res = await axios.get("http://localhost:8000/api/v1/cabins");
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Could not fetch cabins");
  }
}

export async function getCabin(cabinId) {
  try {
    const res = await axios.get(
      `http://localhost:8000/api/v1/cabins/${cabinId}`,
    );
    return res.data.data;
  } catch (error) {
    console.error(error);
    notFound();
    throw new Error("Could not fetch cabin");
  }
}

export async function getUser(email) {
  const res = await axios.get("http://localhost:8000/api/v1/users/me", {
    params: {
      email,
    },
  });
  return res.data.data;
}

export async function createUser({ email, fullName }) {
  const res = await axios.post("http://localhost:8000/api/v1/users/signup", {
    email,
    fullName,
  });
  return res.data.data;
}

export async function updateMe(updatedData) {
  const res = await axios.patch(
    "http://localhost:8000/api/v1/users/updateMe",
    updatedData,
  );
  return res.data.data;
}

export async function getBookings(email) {
  try {
    const res = await axios.get("http://localhost:8000/api/v1/bookings", {
      params: {
        email,
      },
    });
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Could not fetch bookings");
  }
}

export async function getBooking(bookingId) {
  try {
    const session = await auth();
    const email = session?.user?.email;
    const res = await axios.get(
      `http://localhost:8000/api/v1/bookings/${bookingId}`,
      {
        params: {
          email,
        },
      },
    );
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Could not fetch booking");
  }
}

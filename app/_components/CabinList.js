import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "../_lib/data-service";

export default async function CabinList({ filter }) {
  const cabins = await getCabins();
  if (!cabins.length) return null;

  const filteredCabins =
    filter === "all"
      ? cabins
      : filter === "large"
        ? cabins.filter((cabin) => cabin.maxCapacity >= 8)
        : filter === "medium"
          ? cabins.filter((cabin) => cabin.maxCapacity >= 4)
          : filter === "small"
            ? cabins.filter((cabin) => cabin.maxCapacity >= 2)
            : cabins;

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {filteredCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

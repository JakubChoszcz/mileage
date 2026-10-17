import data from "./seed.json" with { type: "json" };

export function getRuns({ from, to }: { from?: string; to?: string } = {}) {
  let runs = data.runs.slice();

  if (from) {
    runs = runs.filter((e) => {
      return from <= e.startedAt.slice(0, 10);
    });
  }

  if (to) {
    runs = runs.filter((e) => {
      return to >= e.startedAt.slice(0, 10);
    });
  }

  return runs.sort((a, b) => b.startedAt.localeCompare(a.startedAt));
}

export function getRun(id: string) {
  return data.runs.find((e) => e.id === id);
}

export function getShoes() {
  const runs = data.runs;
  const shoes = data.shoes.map((shoe) => {
    const mileageMeters = runs
      .filter((run) => run.shoeId === shoe.id)
      .reduce((acc, curr) => acc + curr.distanceMeters, 0);

    return { ...shoe, mileageMeters };
  });

  return shoes;
}

export function getShoe({ id }: { id: string }) {
  let shoe = data.shoes.find((e) => e.id === id);

  if (!shoe) return null;

  const mileageMeters = data.runs
    .filter((e) => e.shoeId === id)
    .reduce((prev, acc) => prev + acc.distanceMeters, 0);

  return { ...shoe, mileageMeters };
}

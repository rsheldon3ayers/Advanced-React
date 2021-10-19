import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, // tells appolo we will take care of everything
    read(existing = [], { args, cache }) {
      const { skip, first } = args;
      // read number of itesm on the page from the cahce
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // check if we have existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);
      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      if (items.length !== first) {
        // no items, go to network

        return false;
      }

      // if there are items return them from the cache, don't go to net

      if (items.length) {
        console.log(
          `There are ${items.length} items in the cache! Gonna send them to Apollo`
        );
        return items;
      }

      return false; // fallback to network
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;

      console.log(`Merging items from the network ${incoming.length}`);

      const merged = existing ? existing.slice(0) : [];

      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      console.log(merged);

      return merged;
    },
  };
}

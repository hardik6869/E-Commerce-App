import { PAGINATION_QUERY } from "../components/Pagination";

const paginationField = () => {
  return {
    keyArgs: false,
    read(existing = [], { args, cache }) {
      const { skip, first } = args;

      //   Read the Number of items on the page from the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      //   check if we have existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);

      //   IF
      //   There are items
      //  And there are not enough items to satisfy how many were requested
      //   And we are on the last page
      // THEN JUST SEND IT
      if (items.length && items.length !== first && page === page) {
        return items;
      }
      if (items.length !== first) {
        // we don't have any items. we must go to the network to fetch them
        return false;
      }
      // if there are items, just return them from the cache, and we don't need to go to the network
      if (items.length) {
        console.log(
          `There are ${items.length} items in the cache! Gonna sen them to apollo`
        );
        return items;
      }
      return false; // fallback to network
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      // This runs when the Apollo client comes back fro the network with our Product
      console.log(`Merging item form the network ${incoming.length}`);
      const merged = existing ? existing.slice(0) : [];
      merged.push(incoming);
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      console.log(merged);
      // Finally, we return the merged items from the cache
      return merged;
    },
  };
};

export default paginationField;

import { DropDown, DropDownItem, SearchStyles } from "./styles/DropDown";
import { useCombobox, resetIdCounter } from "downshift";
import gql from "graphql-tag";
import { useLazyQuery } from "@apollo/client";
import debounce from "lodash.debounce";
import { useRouter } from "next/router";

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    searchTerms: allProducts(
      where: {
        OR: [
          { name_contains_i: $searchTerm }
          { description_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const Search = () => {
  const router = useRouter();
  const [findItems, { loading, data, error }] = useLazyQuery(
    SEARCH_PRODUCTS_QUERY,
    {
      fetchPolicy: "no-cache",
    }
  );
  const items = data?.searchTerms || [];
  const findItemsButChill = debounce(findItems, 350);
  resetIdCounter();
  const {
    isOpen,
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items,
    onInputValueChange() {
      console.log("Input Changed!");
      findItemsButChill({
        variables: {
          searchTerm: inputValue,
        },
      });
    },
    onSelectedItemChange({ selectedItem }) {
      console.log("Selected Item Changed!");
      router.push({ pathname: `/product/${selectedItem.id}` });
    },
    itemToString: (item) => item?.name || null,
  });
  return (
    <SearchStyles>
      <div {...getComboboxProps}>
        <input
          {...getInputProps({
            type: "search",
            placeholder: "Search for an Item",
            id: "search",
            className: loading ? "loading" : "",
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <DropDownItem
              key={item.id}
              {...getItemProps({ item })}
              highlighted={index === highlightedIndex}
            >
              <img src={item.photo.image.publicUrlTransformed} width={50} />
              {item.name}
            </DropDownItem>
          ))}
        {isOpen && !items.length && !loading && (
          <DropDownItem>
            {" "}
            No, DropDown items found for {inputValue}{" "}
          </DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  );
};

export default Search;

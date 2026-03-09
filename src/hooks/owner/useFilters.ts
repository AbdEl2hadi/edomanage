// import {
//     getRouteApi,
//     useNavigate
// } from "@tanstack/react-router"
// import type {
//     RegisteredRouter,
//     RouteIds
// } from "@tanstack/react-router";
// import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/components/owner/dataTable/dataTable";

// const cleanEmptyParams = <T extends Record<string, unknown>>(
//     search: T
// ) => {
//     const newSearch = { ...search };
//     Object.keys(newSearch).forEach((key) => {
//         const value = newSearch[key];
//         if (
//             value === undefined ||
//             value === "" ||
//             (typeof value === "number" && isNaN(value))
//         )
//             delete newSearch[key];
//     });

//     if (search.pageIndex === DEFAULT_PAGE_INDEX) delete newSearch.pageIndex;
//     if (search.pageSize === DEFAULT_PAGE_SIZE) delete newSearch.pageSize;

//     return newSearch;
// };

// export default function useFilters<T extends RouteIds<RegisteredRouter["routeTree"]>>(routeId: T) {
//     const route = getRouteApi<T>(routeId)
//     const navigate = useNavigate()
//     const filters = route.useSearch()

//     const setFilters = (partialFilters: Partial<typeof filters>) => {
//         navigate({
//             search: (prev: typeof filters) => (cleanEmptyParams({ ...prev, ...partialFilters })),
//         })
//     }
//     const resetFilters = () => { navigate({}) }

//     return {
//         filters,
//         setFilters,
//         resetFilters
//     }
// }
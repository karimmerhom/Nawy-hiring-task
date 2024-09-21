"use client";
import React, { useEffect, useState } from "react";
import { getListings, ListingsOptionsRequest } from "@/network/listings";
import { getProjects } from "@/network/filter-options";
import { Box, Text } from "@chakra-ui/layout";
import { useMediaQuery, Spinner } from "@chakra-ui/react";
import Image from "next/image";
import Select from "@/components/select-component/select-component";
import Search from "@/components/search-component/search-component";
import ListingCard from "@/components/listing-card-component/listing-card-component";
import Pagination from "@/components/pagination-component/pagination-component";
import {PaginationDetails} from "@/app/models/interfaces/pagination-details.interface";
import {IListing} from "@/app/models/interfaces/listing.interface";
import {IProject} from "@/app/models/interfaces/project.interface";





export default function Listings() {
  const [loading, setLoading] = useState<boolean>(true);
  const [listings, setListings] = useState<IListing[]>([]);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [paginationDetails, setPaginationDetails] =
    useState<PaginationDetails | null>(null);
  const [listingsOptions, setListingsOptions] = useState<ListingsOptionsRequest>({
    page: 1,
    limit: 8,
  });
  const [query, setQuery] = useState("");
  const [isNonMobile] = useMediaQuery("(min-width: 800px)");

  const adTypeOptions = [
    { value: "Rent", label: "Rent" },
    { value: "Sale", label: "Sale" },
  ];

  const resetListingsOptions = () => {
    const { page, limit } = listingsOptions;
    setListingsOptions({
      page,
      limit,
    });
    setQuery("");
  };

  const bedAndBathOptions = Array.from({ length: 10 }, (_, index) => ({
    value: index + 1,
    label: `${index + 1}`,
  }));

  const projectOptions = projects.map((project) => ({
    value: project.name,
    label: project.name,
  }));

  function getListingsCall() {
    setLoading(true);
    getListings(listingsOptions)
      .then((res) => {
        setListings(res.data.listings);
        setPaginationDetails(res.data.pagination);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }

  useEffect(() => {
    getListingsCall();
  }, [listingsOptions]);

  useEffect(() => {
    getProjects()
      .then((res) => {
        setProjects(res.data.projects);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, []);

  function handleListingOptions(key: string, value: string | number) {
    setListingsOptions((prevOptions) => ({
      ...prevOptions,
      [key]: value,
    }));
  }

  return (
    <Box bg={"primary.100"} width="100%" flexDir={"column"} paddingX={5}>
      <Text pt={5} fontWeight={"semibold"} fontSize={20}>
        {paginationDetails?.total ?? 0} Results Found
      </Text>

      <Box
        w={"100%"}
        display={"flex"}
        flexWrap={"wrap"}
        alignItems={"center"}
        pt={5}
        gap={5}
      >
        <Search
          onChange={handleListingOptions}
          query={query}
          setQuery={setQuery}
        />
        <Select
          onChange={handleListingOptions}
          bg={"primary.80"}
          width={150}
          borderWidth={0}
          placeholder="Ad Type"
          keyToUpdate="adType"
          options={adTypeOptions}
          value={listingsOptions["adType"]}
        />
        <Select
          onChange={handleListingOptions}
          bg={"primary.100"}
          width={150}
          borderWidth={1}
          placeholder="Beds"
          keyToUpdate="bedrooms"
          options={bedAndBathOptions}
          value={listingsOptions["bedrooms"]}
        />
        <Select
          onChange={handleListingOptions}
          bg={"primary.100"}
          width={150}
          borderWidth={1}
          placeholder="Baths"
          keyToUpdate="bathrooms"
          options={bedAndBathOptions}
          value={listingsOptions["bathrooms"]}
        />
        <Select
          onChange={handleListingOptions}
          bg={"primary.100"}
          width={250}
          borderWidth={1}
          placeholder="Project"
          keyToUpdate="projectName"
          options={projectOptions}
          value={listingsOptions["projectName"]}
        />
        {Object.keys(listingsOptions).length > 2 && (
          <Text
            fontSize={15}
            textDecoration="underline"
            cursor={"pointer"}
            onClick={resetListingsOptions}
          >
            Clear all
          </Text>
        )}
      </Box>
      {listings.length > 0 ? (
        <>
        <Box
          w={"100%"}
          display={"flex"}
          flexWrap={"wrap"}
          pt={5}
          pb={5}
          gap={5}
        >
          {listings.map((listing:IListing) => (
            <ListingCard listing={listing} isNonMobile={isNonMobile} key={listing._id} />
          ))}
        </Box>
    <Box w={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'} pb={10} pt={5}>
    <Pagination
                PaginationDetails={paginationDetails}
                onChange={handleListingOptions}
              />
    </Box>
       
        </>
      ) : (
        <Box
          w={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDir={"column"}
        >
          {!loading ? (
            <>
              {" "}
              <Image
                src="/assets/images/no results.jpg"
                alt="Image"
                width={300}
                height={300}
              />
              <Text fontWeight={"bold"}>
                Sorry, we could not find any matching ads...
              </Text>
            </>
          ) : (
            <Box
              w={"100%"}
              h={400}
              display="flex"
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Spinner
                thickness="5px"
                speed="0.65s"
                color="primary.60"
                size="xl"
              />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

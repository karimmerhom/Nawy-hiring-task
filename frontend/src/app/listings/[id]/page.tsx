import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { formatPrice } from "@/helpers/currency-format";
import { IAmenity } from "@/app/models/interfaces/amenity.interface";
import {
  faUser as UserIcon,
  faEnvelope as EmailIcon,
  faPhone as PhoneIcon,
  faBed as BedIcon,
  faBath as BathIcon,
  faExpand as AreaIcon,
  faBuilding as BuildingIcon,
  faHouse as HouseIcon,
  faIdCardClip as RefNumberIcon,
  faPeopleGroup as ProjectIocn,
  faCheck as IncludedIcon,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import ImageCarousal from "@/components/imgae-carousal/image-carousal";
import TagsBox from "@/components/detailed-ad-tags/detaild-ad-tag";
import DetailsCard from "@/components/detail-card/detail-card";

type Props = {
  params: {
    id: string;
  };
};
const ListingPage = async ({ params }: Props) => {
  const { id } = params;

  let res = await fetch(
    `${
      process.env.NEXT_PUBLIC_DOCKER === "TRUE"
        ? process.env.NEXT_PUBLIC_SERVER_URL_DOCKER
        : process.env.NEXT_PUBLIC_SERVER_URL
    }listing/${id}`,
    {
      cache: "force-cache",
    }
  );
  let body = await res.json();
  const listing = body.listing;
  if (!res.ok) {
    throw new Error("Failed to Load Ad details");
  }
  interface IconMap {
    Apartment: IconDefinition;
    Villa: IconDefinition;
    Townhouse: IconDefinition;
    Studio: IconDefinition;
    Duplex: IconDefinition;
    Penthouse: IconDefinition;
  }

  type UnitType =
    | "Apartment"
    | "Villa"
    | "Townhouse"
    | "Studio"
    | "Duplex"
    | "Penthouse";

  const typeToIcon: IconMap = {
    Apartment: BuildingIcon,
    Villa: HouseIcon,
    Townhouse: HouseIcon,
    Studio: BuildingIcon,
    Duplex: BuildingIcon,
    Penthouse: BuildingIcon,
  };

  function detail(key: string, value: string | number, icon: IconProp | null) {
    return (
      <Box
        display={"flex"}
        flexDir={"row"}
        gap={5}
        h={10}
        minW={"fit-content"}
        width={"30%"}
        alignItems={"center"}
      >
        {icon && (
          <Box w={5} h={5}>
            <FontAwesomeIcon icon={icon} color={'black'} />
          </Box>
        )}
        <Text color={'text.quaternary'} fontSize={20}>
          <Text as="span" fontWeight="bold" >
            {key}
          </Text>
          : {value}
        </Text>
      </Box>
    );
  }

  return (
    <Box w={"100%"} pb={20}>
      <Box
        px={5}
        mt={5}
        display={"flex"}
        flexWrap={"wrap"}
        flexDir={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box
          display={"flex"}
          flexWrap={"wrap"}
          flexDir={"row"}
          alignItems={"center"}
          gap={2}
        >
          <Text color={'text.quaternary'}fontWeight={"semibold"} fontSize={20}>
            {listing?.unit.name},
          </Text>
          <Text fontWeight={"semibold"} fontSize={12} color={"text.tertiary"}>
            {`${listing?.unit.location.subArea}, ${listing?.unit.location.area}`}
          </Text>
        </Box>
        <Text fontSize={20} fontWeight={"bold"} color={"text.primary"} pt={2}>
          {`${formatPrice(listing?.price)}`}{" "}
          {listing?.rentType ? "/ " + listing?.rentType : ""}
        </Text>
      </Box>
      <Box display={"flex"} flexDir={"row"} gap={5} px={5}>
        <TagsBox adType={listing?.adType} featured={listing?.featured} />
      </Box>
      <ImageCarousal images={listing?.unit.imageUrls} />
      <DetailsCard title={"Description"}>
        <Text color={'text.quaternary'} fontSize={20} fontWeight={"normal"}>
          {listing?.description}
        </Text>
      </DetailsCard>

      <DetailsCard title={"Amenities"}>
        {listing?.unit.amenities.map((amenity: IAmenity) => (
          <Box
            key={listing?._id}
            display={"flex"}
            flexDir={"row"}
            gap={5}
            h={10}
            width={"33%"}
            alignItems={"center"}
          >
             <Box w={5} h={5}>
            <FontAwesomeIcon icon={IncludedIcon} />
          </Box>
            <Text color={'text.quaternary'} fontSize={20} fontWeight={"normal"}>
              {amenity.name}
            </Text>
          </Box>
        
        ))}
      </DetailsCard>

      <DetailsCard title={"Details"}>
        {detail("Project", listing?.unit.project.name, ProjectIocn)}
        {detail("Ref Number #", listing?.unit.refNumber, RefNumberIcon)}
        {detail(
          "Type",
          listing?.unit.unitType,
          listing ? typeToIcon[listing.unit.unitType as UnitType] : null
        )}
        {detail("Area", `${listing?.unit.area} m²`, AreaIcon)}
        {detail("Bedrooms", listing?.unit.bedrooms, BedIcon)}
        {detail("Bathroom", listing?.unit.bathrooms, BathIcon)}
      </DetailsCard>

      <DetailsCard title={"Owner Details"}>
        {detail("Name", listing?.seller.name, UserIcon)}
        {detail("Phone Number", listing?.seller.phoneNumber, PhoneIcon)}
        {detail("Email", listing?.seller.email, EmailIcon)}
      </DetailsCard>
    </Box>
  );
};
export default ListingPage;

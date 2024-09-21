import React, { useContext } from "react";
import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faLocationDot as LocationIcon,
  faBed as BedIcon,
  faBath as BathIcon,
  faExpand as AreaIcon,
} from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "@/context/theme";
import { formatPrice } from "@/helpers/currency-format";
import {IListing} from "@/app/models/interfaces/listing.interface";

interface listingCardProps{
  listing:IListing,
  isNonMobile:boolean,
  key:string
}
const ListingCard: React.FC<listingCardProps> = ({ listing, isNonMobile,key }) => {
  const themeCtx = useContext(ThemeContext);

  function iconBox(icon: IconProp, value: number|string) {
    return (
      <Box
        bg={"primary.40"}
        display={"flex"}
        flexDir={"row-reverse"}
        gap={1}
        borderRadius={2}
        alignItems={"center"}
        px={1}
      >
        <FontAwesomeIcon
          icon={icon}
          size={"2xs"}
          color={themeCtx?.theme.colors.text.tertiary}
        />
        <Text fontSize={12} fontWeight={"bold"} color={"text.tertiary"}>
          {value}
        </Text>
      </Box>
    );
  }

  function adTags(backgroundColor: string, textColor: string, text: string) {
    return (
      <Box bg={backgroundColor} borderRadius={5} px={2} py={1}>
        <Text fontSize={12} color={textColor} fontWeight="bold">
          {text}
        </Text>
      </Box>
    );
  }

  return (
    <Box
      key={key}
      w={isNonMobile ? "23.5%" : "100%"}
      minW={300}
      pb={5}
      borderRadius={20}
      borderWidth={2}
      bg="primary.100"
      boxShadow={"5px 4px 15px 1px rgba(0,0,0,0.2)"}
      flexDir={"column"}
    >
      <Box
        m={4}
        borderWidth={2}
        borderRadius={10}
        boxShadow="5px 4px 15px 1px rgba(0,0,0,0.2)"
        overflow={"hidden"}
        position="relative"
      >
        <Box h={200}>
          <Box position={"absolute"} display={'flex'} gap={2} flexDir={'row-reverse'} top={2} right={2} zIndex={1}>
            {adTags("primary.60", "text.secondary", listing.adType)}
            {listing.featured && (
              <>{adTags("primary.80", "text.secondary", "Featured")}</>
            )}
          </Box>
          <Image
            src={listing.unit.imageUrls[0]}
            alt="Image"
            layout="fill"
            objectFit="cover"
          />
        </Box>
      </Box>
      <Box px={4}>
        <Text fontSize={12} fontWeight={"semibold"}>
          {listing.unit.name.length > 40
            ? `${listing.unit.name.substring(0, 40)}...`
            : listing.unit.name}
        </Text>
        <Text fontSize={15} color={"text.primary"} pt={2}>
        {`${formatPrice(listing.price)}`} {listing.rentType? '/ '+listing.rentType:''}
        </Text>
        <Box
          display={"flex"}
          flexWrap={"wrap"}
          justifyContent={"space-between"}
        >
          <Box
            display={"flex"}
            flexDir={"row"}
            gap={2}
            alignItems={"center"}
            pt={2}
          >
            <FontAwesomeIcon
              icon={LocationIcon}
              size={"2xs"}
              color={themeCtx?.theme.colors.text.tertiary}
            />
            <Text fontSize={12} color={"text.tertiary"}>
              {`${listing.unit.location.subArea}, ${listing.unit.location.area}`}
            </Text>
          </Box>
          <Box gap={1} flexDir={"row"} display={"flex"}>
            {iconBox(AreaIcon, `${listing.unit.area} m²`)}
            {iconBox(BedIcon, listing.unit.bedrooms)}
            {iconBox(BathIcon, listing.unit.bathrooms)}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ListingCard;

import React, { useContext } from "react";
import { Box, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot as LocationIcon,
  faBed as BedIcon,
  faBath as BathIcon,
  faExpand as AreaIcon,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { ThemeContext } from "@/context/theme";
import { formatPrice } from "@/helpers/currency-format";
import { IListing } from "@/app/models/interfaces/listing.interface";
import IconBox from "../icon-box/icon-box";
import AdTag from "../ad-tag/ad-tag";
import Image from "next/image";

interface listingCardProps {
  listing: IListing;
  isNonMobile: boolean;
  key: string;
}
const ListingCard: React.FC<listingCardProps> = ({
  listing,
  isNonMobile,
  key,
}) => {
  const themeCtx = useContext(ThemeContext);
  const router = useRouter();

  return (
    <Box
      cursor={"pointer"}
      onClick={() => {
        router.push(`/listings/${listing._id}`);
      }}
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
          <Box
            position={"absolute"}
            display={"flex"}
            gap={2}
            flexDir={"row-reverse"}
            top={2}
            right={2}
            zIndex={1}
          >
            <AdTag
              backgroundColor={"primary.60"}
              textColor={"text.secondary"}
              text={listing.adType}
              themeCtx={themeCtx}
            />
            {listing.featured && (
              <AdTag
                backgroundColor={"primary.80"}
                textColor={"text.secondary"}
                text={"Featured"}
                themeCtx={themeCtx}
              />
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
        <Text fontSize={12} fontWeight={"semibold"} color={'text.quaternary'}>
          {listing.unit.name.length > 40
            ? `${listing.unit.name.substring(0, 40)}...`
            : listing.unit.name}
        </Text>
        <Text fontSize={15} color={"text.primary"} pt={2}>
          {`${formatPrice(listing.price)}`}{" "}
          {listing.rentType ? "/ " + listing.rentType : ""}
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
            <IconBox
              icon={AreaIcon}
              value={`${listing.unit.area} m²`}
              themeCtx={themeCtx}
            />
            <IconBox
              icon={BedIcon}
              value={listing.unit.bedrooms}
              themeCtx={themeCtx}
            />
            <IconBox
              icon={BathIcon}
              value={listing.unit.bathrooms}
              themeCtx={themeCtx}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ListingCard;

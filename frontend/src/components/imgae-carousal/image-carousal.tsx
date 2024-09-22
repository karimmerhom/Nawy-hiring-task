"use client";
import React from "react";
import { Box, Image } from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ImageCarousalProps {
  images: string[];
}

const ImageCarousal: React.FC<ImageCarousalProps> = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Box  maxW={800} mt={10} mx={'auto'}>
      <Slider {...settings} autoplay={true}>
        {images?.map((image: string, index: number) => (
          <Box key={index} w={"100%"}>
            <Image
              src={image}
              alt={`Slide ${index}`}
              objectFit="fill"
              w={800}
              borderRadius={20}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default ImageCarousal;

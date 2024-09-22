'use client'
import React, {useContext} from "react";
import { ThemeContext } from "@/context/theme";
import AdTag from "../ad-tag/ad-tag";

interface TagsProps{
    adType: string, 
    featured: Boolean, 

}

const TagsBox: React.FC<TagsProps> = ({ adType, featured }) => {
    const themeCtx = useContext(ThemeContext);
    return (
        <>
        <AdTag
        backgroundColor={"primary.60"}
        textColor={"text.secondary"}
        text={adType}
        themeCtx={themeCtx}
      />
      {featured && (
        <AdTag
          backgroundColor={"primary.80"}
          textColor={"text.secondary"}
          text={"Featured"}
          themeCtx={themeCtx}
        />
      )}
      </>
    );
  }
  export default TagsBox
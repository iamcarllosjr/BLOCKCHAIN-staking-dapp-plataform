"use client";
import { useContext } from "react";
import Web3Context from "@/app/Context/Web3Context";

const ConnectedNetwork = () => {
  const { chainId } = useContext(Web3Context);

  if(chainId === null){
    return <p>Not Connected</p>
  } else if(chainId === 137){
    return <p>Polygon Network</p>
  } else {
    return <p>Network Not Detected</p>
  }
  
};

export default ConnectedNetwork;

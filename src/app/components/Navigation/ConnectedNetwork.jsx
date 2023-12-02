"use client";
import { useContext } from "react";
import Web3Context from "@/app/Context/Web3Context";

const ConnectedNetwork = () => {
  const { chainId } = useContext(Web3Context);

  if(chainId === null){
    return <p>Not Connected</p>
  } else if(chainId === 80001){
    return <p>Network : Polygon Mumbai</p>
  } else {
    return <p>Network Unsupported</p>
  }
  
};

export default ConnectedNetwork;

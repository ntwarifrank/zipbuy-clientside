"use client"
import Nav from "./nav/page";
import Homepage from "./home/homepage"

export default function Home() {
  return (
    <div>
      <Nav></Nav>
      <div className="flex flex-row w-[100%]">
        <Homepage></Homepage>

      </div>
    </div>
  );
}

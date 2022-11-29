import EmailIcon from "@suid/icons-material/Email";
import PhoneIcon from "@suid/icons-material/Phone";
import { Component, JSX } from "solid-js";

const Footer: Component<JSX.HTMLAttributes<HTMLDivElement>> = () => {
  return (
    <div class="flex flex-row flex-wrap items-center truncate bg-slate-800 text-slate-100">
      <div class="hidden p-5 sm:block">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d803.6655679207136!2d20.4918437321032!3d49.984727939426776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47162567de4b7fff%3A0xf2eded6722c86ad4!2sOdnawialne%20%C5%BAr%C3%B3d%C5%82a%20energii%20-%20instalacje%20fotowoltaiczne%2C%20teletechniczne.!5e0!3m2!1sen!2spl!4v1663765810635!5m2!1sen!2spl"
          width="600"
          height="450"
          style={{ border: "0" }}
          allowfullscreen={true}
          referrerpolicy="no-referrer-when-downgrade"
        />
      </div>
      <div class="flex flex-1 flex-col p-8 text-2xl">
        <div class="p-2 text-4xl font-medium">Kontakt</div>
        <div class="flex flex-row items-center p-2 font-medium">
          <PhoneIcon class="m-2 text-slate-300" />
          <span>tel:</span>
          <span class="ml-5">{"+48 730 773 651"}</span>
        </div>
        <div class="flex flex-row items-center p-2 font-medium">
          <EmailIcon class="m-2 text-slate-300" />
          <span>mail:</span>
          <span class="ml-5">{"biuro@selftech.pl"}</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;

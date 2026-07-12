import logoImg from "@/assets/khruta-logo.png";

export function Logo() {
  return (
    <div className="h-14 w-32 lg:h-16 lg:w-48 overflow-hidden rounded-[10px]">
      <img src={logoImg} alt="Khruta logo" className="h-full w-full object-cover scale-125" />
    </div>
  );
}

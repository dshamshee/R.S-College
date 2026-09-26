import Image from "next/image";

export default function Entrance() {
    return (
        <div className="w-full h-auto block overflow-hidden">
            <Image
                src="/images/Enterence-2.png"
                alt="Ramdeo Sharda College campus entrance and main building, Salmari, Katihar, Bihar"
                width={1200}
                height={600}
                className="w-full max-h-[600px] object-cover"
                priority
            />
        </div>
    );
}
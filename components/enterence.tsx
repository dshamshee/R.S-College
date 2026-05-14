import Image from "next/image";

export default function Entrance() {
    return (
        <div className="w-full h-auto block overflow-hidden">
            <Image
                src="/images/Enterence-2.png"
                alt="Entrance"
                width={500}
                height={500}
                className="w-full max-h-[600px] object-cover"
            />
        </div>
    );
}
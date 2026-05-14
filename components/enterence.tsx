import Image from "next/image";

export default function Entrance() {
    return (
        <div className="w-full h-auto block overflow-hidden">
            <Image
                src="/images/Enterence.png"
                alt="Entrance"
                width={500}
                height={500}
                className="w-full max-h-[500px] object-cover"
            />
        </div>
    );
}
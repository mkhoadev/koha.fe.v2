import Image from "next/image";

interface NftsCardProps {
  uuid: string;
  image: string;
  name: string;
  remove: (id: string) => void;
}

function NftCardUpload({ uuid, image, name, remove }: NftsCardProps) {
  return (
    <div className="card__wrap">
      <div className="card__image">
        <Image src={image} alt="" width={200} height={200} />
        <div className="card__action">
          <button className="btn" onClick={() => remove(uuid)}>
            Remove
          </button>
        </div>
      </div>
      <p className="card__name">{name}</p>
    </div>
  );
}

export default NftCardUpload;

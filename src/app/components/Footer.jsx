import Image from 'next/image';

export default function SocialIcons() {
  return (
    <div className="flex justify-center space-x-6 py-6">
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <Image src="/icons/twitter.svg" alt="Twitter" width={24} height={24} />
      </a>
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <Image src="/icons/facebook.svg" alt="Facebook" width={24} height={24} />
      </a>
      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
        <Image src="/icons/youtube.svg" alt="YouTube" width={24} height={24} />
      </a>
      <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
        <Image src="/icons/tiktok.svg" alt="TikTok" width={24} height={24} />
      </a>
    </div>
  );
}

import { Edit2 } from 'lucide-react';

export default function ProfileCard() {
  return (
    <div className="bg-[#3a3a3a] rounded-lg p-6 relative shadow-lg mb-8">
      <button className="absolute top-6 right-6 text-gray-400 hover:text-white"><Edit2 size={16}/></button>
      <h3 className="text-lg font-bold text-white mb-4">Rajan V. Sahatrabudhe</h3>
      <div className="grid grid-cols-[100px_1fr] gap-y-1 text-sm">
        <div className="text-[#9ca3af]">Role:</div><div>Backend Developer</div>
        <div className="text-[#9ca3af]">Domain:</div><div>BFS</div>
        <div className="text-[#9ca3af]">Tech Stack:</div><div>Java, Spring, Kafka</div>
      </div>
    </div>
  );
}
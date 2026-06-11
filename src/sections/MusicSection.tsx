import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Check, Music, ChevronRight } from 'lucide-react';

const C = {
  background: '#FAF8F5',
  paper: '#FFFFFF',
  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
  body: '#374151',
  border: '#E7E2DC',
  accent: '#C97A8B',
  sage: '#A8BBA2',
};

interface MusicSectionProps {
  onComplete: () => void;
  updateScore: (points: number) => void;
  musicScore: number;
}

const songs = [
  { id: 1, title: 'Enna Sona', movie: 'OK Jaanu', color: '#D4956A', textColor: '#fff' },
  { id: 2, title: 'Zehnaseeb', movie: 'Hasee Toh Phasee', color: '#A8BBA2', textColor: '#1F2937' },
  { id: 3, title: 'Mast Magan', movie: '2 States', color: '#B8A7D9', textColor: '#1F2937' },
  { id: 4, title: 'Kabira Encore', movie: 'YJHD', color: '#C97A8B', textColor: '#fff' },
  { id: 5, title: 'Tum Se Hi', movie: 'Jab We Met', color: '#8BAAB3', textColor: '#fff' },
  { id: 6, title: 'Raabta', movie: 'Agent Vinod', color: '#7D9B8C', textColor: '#fff' },
  { id: 7, title: 'Agar Tum Saath Ho', movie: 'Tamasha', color: '#B5887A', textColor: '#fff' },
  { id: 8, title: 'Iktara', movie: 'Wake Up Sid', color: '#9AADA7', textColor: '#1F2937' },
  { id: 9, title: 'Shayad', movie: 'Love Aaj Kal', color: '#BBA8C8', textColor: '#1F2937' },
  { id: 10, title: 'Pee Loon', movie: 'Once Upon A Time', color: '#5C7A9A', textColor: '#fff' },
  { id: 11, title: 'Hawayein', movie: 'Jab Harry Met Sejal', color: '#8C9E7A', textColor: '#fff' },
  { id: 12, title: 'Khairiyat', movie: 'Chhichhore', color: '#909090', textColor: '#fff' },
  { id: 13, title: 'Safarnama', movie: 'Tamasha', color: '#C4A876', textColor: '#1F2937' },
  { id: 14, title: 'Ilahi', movie: 'YJHD', color: '#D4876A', textColor: '#fff' },
  { id: 15, title: 'Vintunnava', movie: 'Dear Comrade', color: '#7AB8C4', textColor: '#1F2937' },
  { id: 16, title: 'Nee Choopule', movie: 'Geetha Govindam', color: '#C4956A', textColor: '#fff' },
  { id: 17, title: 'Inthandham', movie: 'Bheeshma', color: '#8BAA8C', textColor: '#1F2937' },
  { id: 18, title: 'Maate Vinadhuga', movie: 'Taxiwaala', color: '#9A7EC4', textColor: '#fff' },
];

const rotations = [-4, 3, -2, 5, -3, 4, -5, 2, -3, 4, -1, 3, -4, 2, -3, 5, -2, 3];

function VinylRecord({
  song,
  isSelected,
  onSelect,
  rotation,
  delay,
}: {
  song: typeof songs[0];
  isSelected: boolean;
  onSelect: () => void;
  rotation: number;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, rotate: isSelected ? rotation * 0.3 : rotation }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.08, rotate: 0, y: -6, zIndex: 20 }}
      onClick={onSelect}
      className="cursor-pointer relative"
      style={{ zIndex: isSelected ? 10 : 1 }}
    >
      {/* Vinyl disc */}
      <motion.div
        animate={isSelected ? { rotate: 360 } : { rotate: 0 }}
        transition={isSelected ? { duration: 10, repeat: Infinity, ease: 'linear' } : { duration: 0.4 }}
        className="relative rounded-full mx-auto"
        style={{
          width: '112px',
          height: '112px',
          background: '#1a1a1a',
          boxShadow: isSelected
            ? `0 8px 28px ${song.color}55, 0 0 0 3px ${song.color}50`
            : '0 4px 18px rgba(0,0,0,0.35)',
        }}
      >
        {/* Groove rings */}
        {[40, 56, 70, 84].map((size, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${size}%`,
              height: `${size}%`,
              top: `${(100 - size) / 2}%`,
              left: `${(100 - size) / 2}%`,
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          />
        ))}

        {/* Center label */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex flex-col items-center justify-center px-0.5"
          style={{
            width: '44px',
            height: '44px',
            background: song.color,
            boxShadow: 'inset 0 1px 6px rgba(0,0,0,0.3)',
          }}
        >
          <Music style={{ width: '9px', height: '9px', color: song.textColor, opacity: 0.85, flexShrink: 0 }} />
          <p
            className="font-inter font-bold text-center leading-tight mt-0.5"
            style={{
              fontSize: '5.5px',
              color: song.textColor,
              maxWidth: '36px',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              wordBreak: 'break-word',
            }}
          >
            {song.title}
          </p>
        </div>

        {/* Shine overlay */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 32% 28%, rgba(255,255,255,0.14) 0%, transparent 55%)' }}
        />
      </motion.div>

      {/* Song info */}
      <div className="text-center mt-2.5" style={{ maxWidth: '112px' }}>
        <p
          className="font-playfair font-semibold leading-tight"
          style={{ fontSize: '10.5px', color: C.textPrimary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        >
          {song.title}
        </p>
        <p
          className="font-caveat leading-tight"
          style={{ fontSize: '10px', color: C.textSecondary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        >
          {song.movie}
        </p>
      </div>

      {/* Selected badge */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="absolute rounded-full flex items-center justify-center"
          style={{
            width: '20px',
            height: '20px',
            top: '-4px',
            right: '-2px',
            background: C.sage,
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            zIndex: 10,
          }}
        >
          <Check style={{ width: '10px', height: '10px', color: '#fff' }} />
        </motion.div>
      )}
    </motion.div>
  );
}

export default function MusicSection({ onComplete, updateScore }: MusicSectionProps) {
  const [phase, setPhase] = useState<'canvas' | 'complete'>('canvas');
  const [selectedSongs, setSelectedSongs] = useState<number[]>([]);

  const toggleSong = (id: number) => {
    setSelectedSongs(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleCreatePlaylist = () => {
    updateScore(50);
    setPhase('complete');
  };

  const selectedDetails = selectedSongs
    .map(id => songs.find(s => s.id === id))
    .filter(Boolean) as typeof songs;

  return (
    <section
      id="music"
      className="relative py-16 md:py-24 px-4 md:px-8"
      style={{ background: C.background }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="font-caveat text-lg mb-2" style={{ color: C.accent }}>
            CHAPTER 4
          </p>
          <h2
            className="font-playfair text-3xl md:text-4xl font-bold mb-3"
            style={{ color: C.textPrimary }}
          >
            The Soundtrack of <span style={{ color: C.accent }}>Her Life</span>
          </h2>
          <p className="font-cormorant text-lg" style={{ color: C.body }}>
            Every song tells a story.
          </p>
          <p className="font-cormorant text-base mt-1" style={{ color: C.textSecondary }}>
            Pick the ones that deserve a place in your playlist.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {phase === 'canvas' && (
            <motion.div
              key="canvas"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Vinyl canvas */}
              <div
                className="rounded-2xl p-8 md:p-12 mb-8"
                style={{
                  background: C.paper,
                  border: `1px solid ${C.border}`,
                  boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                    gap: '24px 20px',
                    justifyItems: 'center',
                  }}
                >
                  {songs.map((song, index) => (
                    <VinylRecord
                      key={song.id}
                      song={song}
                      isSelected={selectedSongs.includes(song.id)}
                      onSelect={() => toggleSong(song.id)}
                      rotation={rotations[index % rotations.length]}
                      delay={index * 0.035}
                    />
                  ))}
                </div>
              </div>

              {/* Selected playlist preview */}
              {selectedSongs.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8"
                >
                  <div
                    className="rounded-2xl p-6"
                    style={{ background: C.paper, border: `1px solid ${C.border}` }}
                  >
                    <h3
                      className="font-sacramento text-2xl text-center mb-4"
                      style={{ color: C.accent }}
                    >
                      Gayatri's Playlist
                    </h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {selectedDetails.map(song => (
                        <motion.div
                          key={song.id}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                          style={{
                            background: `${song.color}18`,
                            border: `1px solid ${song.color}35`,
                          }}
                        >
                          <div
                            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                            style={{ background: song.color }}
                          />
                          <span
                            className="font-inter font-medium"
                            style={{ fontSize: '12px', color: C.textPrimary }}
                          >
                            {song.title}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Counter + CTA */}
              <div className="text-center">
                <p className="font-caveat text-base mb-4" style={{ color: C.textSecondary }}>
                  {selectedSongs.length === 0
                    ? 'Click on a vinyl to add it to your playlist'
                    : selectedSongs.length < 5
                    ? `${selectedSongs.length} selected — ${5 - selectedSongs.length} more to continue`
                    : `${selectedSongs.length} songs selected`}
                </p>

                <motion.button
                  whileHover={selectedSongs.length >= 5 ? { scale: 1.02, y: -2 } : {}}
                  whileTap={selectedSongs.length >= 5 ? { scale: 0.98 } : {}}
                  onClick={handleCreatePlaylist}
                  disabled={selectedSongs.length < 5}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: selectedSongs.length >= 5 ? C.textPrimary : '#D1D5DB',
                    color: selectedSongs.length >= 5 ? '#FFFFFF' : '#9CA3AF',
                    border: 'none',
                    borderRadius: '999px',
                    padding: '14px 32px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontSize: '14px',
                    cursor: selectedSongs.length >= 5 ? 'pointer' : 'not-allowed',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <span>Create My Playlist</span>
                  <ChevronRight size={16} />
                </motion.button>
              </div>
            </motion.div>
          )}

          {phase === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-lg mx-auto"
            >
              <div
                className="rounded-2xl p-8 text-center"
                style={{
                  background: C.paper,
                  border: `1px solid ${C.border}`,
                  boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ background: C.sage }}
                >
                  <Check style={{ width: '24px', height: '24px', color: '#fff' }} />
                </motion.div>

                <h3
                  className="font-playfair text-2xl font-bold mb-2"
                  style={{ color: C.textPrimary }}
                >
                  Playlist Complete
                </h3>
                <p
                  className="font-cormorant text-base mb-6"
                  style={{ color: C.textSecondary }}
                >
                  A collection of comfort songs, memories, and favorite moments.
                </p>

                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  {selectedDetails.map(song => (
                    <div
                      key={song.id}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full"
                      style={{
                        background: `${song.color}18`,
                        border: `1px solid ${song.color}35`,
                      }}
                    >
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: song.color }}
                      />
                      <span
                        className="font-inter font-medium"
                        style={{ fontSize: '11px', color: C.textPrimary }}
                      >
                        {song.title}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onComplete}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: C.textPrimary,
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '999px',
                    padding: '14px 32px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  <span>Continue</span>
                  <ChevronRight size={16} />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

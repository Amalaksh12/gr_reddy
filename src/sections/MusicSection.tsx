import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  Music, Check, Disc3, Sparkles, Heart, Star, AudioWaveform
} from 'lucide-react';
import { Confetti } from '../components/CelebrationEffects';

const C = {
  background: '#F8F6F2',
  paper: '#FFFFFF',
  textPrimary: '#1E293B',
  textSecondary: '#6B7280',
  border: '#D6D3D1',
  accent: '#C08497',
};

interface MusicSectionProps {
  onComplete: () => void;
  updateScore: (points: number) => void;
  musicScore: number;
}

const songs = [
  {
    id: 1,
    title: 'Enna Sona',
    movie: 'OK Jaanu',
    mood: 'Golden Hour',
    color: '#E6B98D',
    note: '"Golden hour in a song."'
  },
  {
    id: 2,
    title: 'Zehnaseeb',
    movie: 'Hasee Toh Phasee',
    mood: 'Comfort Song',
    color: '#A7C4A0',
    note: '"Comfort music."'
  },
  {
    id: 3,
    title: 'Mast Magan',
    movie: '2 States',
    mood: 'Daydreaming',
    color: '#B9AEDC',
    note: '"For the daydreamers."'
  },
  {
    id: 4,
    title: 'Kabira Encore',
    movie: 'Yeh Jawaani Hai Deewani',
    mood: 'Nostalgia',
    color: '#C08497',
    note: '"Never gets old."'
  },
  {
    id: 5,
    title: 'Tum Se Hi',
    movie: 'Jab We Met',
    mood: 'Feels Like Home',
    color: '#E6DDD4',
    note: '"Feels like home."'
  },
  {
    id: 6,
    title: 'Hawayein',
    movie: 'Jab Harry Met Sejal',
    mood: 'Memories',
    color: '#7D9F9A',
    note: '"Like revisiting old memories."'
  },
  {
    id: 7,
    title: 'Shayad',
    movie: 'Love Aaj Kal',
    mood: 'Hope',
    color: '#9B8AA6',
    note: '"Maybe tomorrow."'
  },
  {
    id: 8,
    title: 'Pee Loon',
    movie: 'Once Upon A Time In Mumbai',
    mood: 'Late Night',
    color: '#1E293B',
    note: '"Those midnight thoughts."'
  },
  {
    id: 9,
    title: 'Tera Hone Laga Hoon',
    movie: 'Ajab Prem Ki Ghazab Kahani',
    mood: 'Romance',
    color: '#D4A5A5',
    note: '"Falling in love vibes."'
  },
  {
    id: 10,
    title: 'Raabta',
    movie: 'Agent Vinod',
    mood: 'Soulful',
    color: '#B8A088',
    note: '"When souls connect."'
  },
  {
    id: 11,
    title: 'Agar Tum Saath Ho',
    movie: 'Tamasha',
    mood: 'Emotional',
    color: '#6B8E8E',
    note: '"For the deeply felt moments."'
  },
  {
    id: 12,
    title: 'Khairiyat',
    movie: 'Chhichhore',
    mood: 'Bittersweet',
    color: '#9CA3AF',
    note: '"Hope in goodbye."'
  },
  {
    id: 13,
    title: 'O Saathi',
    movie: 'Baaghi 2',
    mood: 'Devotion',
    color: '#8B7355',
    note: '"Unwavering love."'
  },
  {
    id: 14,
    title: 'Iktara',
    movie: 'Wake Up Sid',
    mood: 'Dreamy',
    color: '#7BA3A8',
    note: '"Finding your path."'
  },
  {
    id: 15,
    title: 'Ilahi',
    movie: 'Yeh Jawaani Hai Deewani',
    mood: 'Wanderlust',
    color: '#E8A87C',
    note: '"Chasing dreams."'
  },
  {
    id: 16,
    title: 'Phir Le Aya Dil',
    movie: 'Barfi!',
    mood: 'Longing',
    color: '#A08CA8',
    note: '"Love that lingers."'
  },
];

const playlistSummaries: Record<string, string> = {
  comfort: "Your playlist is filled with comfort, comfort, a comfort, nostalgia, and songs that feel like home.",
  dreamer: "A playlist made for dreamers, hopeless romantics, and people who always find meaning in music.",
  memories: "Some songs are more than music. They're memories waiting to be revisited.",
  romantic: "Love stories, golden moments, and the feeling of butterflies—all captured in your playlist.",
  soulful: "Your playlist speaks to the soul—deep, meaningful, and beautifully introspective.",
  default: "A beautiful collection of songs that tell your story.",
};

function getPlaylistSummary(selectedIds: number[]): string {
  const selected = selectedIds.map(id => songs.find(s => s.id === id)).filter(Boolean);
  const moods = selected.map(s => s?.mood);

  if (moods.includes('Comfort Song') && moods.includes('Nostalgia') && moods.includes('Feels Like Home')) {
    return playlistSummaries.comfort;
  }
  if (moods.includes('Daydreaming') && moods.includes('Romance') && moods.includes('Golden Hour')) {
    return playlistSummaries.dreamer;
  }
  if (moods.includes('Nostalgia') && moods.includes('Memories') && moods.includes('Soulful')) {
    return playlistSummaries.memories;
  }
  if (moods.includes('Romance') && moods.includes('Golden Hour') && moods.includes('Hope')) {
    return playlistSummaries.romantic;
  }
  if (moods.includes('Soulful') && moods.includes('Late Night')) {
    return playlistSummaries.soulful;
  }

  return playlistSummaries.default;
}

// Vinyl Record Component
function VinylRecord({
  song,
  isSelected,
  onSelect,
  index
}: {
  song: typeof songs[0];
  isSelected: boolean;
  onSelect: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: -10 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ delay: index * 0.06 }}
      whileHover={{ scale: 1.05, y: -5 }}
      onClick={() => onSelect()}
      className="cursor-pointer relative"
    >
      {/* Vinyl Record */}
      <motion.div
        animate={isSelected ? { rotate: 360 } : { rotate: 0 }}
        transition={isSelected ? { duration: 8, repeat: Infinity, ease: 'linear' } : { duration: 0.5 }}
        className="relative w-32 h-32 md:w-36 md:h-36 rounded-full shadow-xl mx-auto"
        style={{
          background: 'linear-gradient(135deg, #1E293B 0%, #374151 50%, #1E293B 100%)',
          boxShadow: isSelected
            ? `0 8px 30px ${song.color}60, 0 0 0 4px ${song.color}40`
            : '0 8px 20px rgba(0,0,0,0.25)',
        }}
      >
        {/* Grooves */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-gray-600/30"
            style={{
              width: `${70 + i * 12}%`,
              height: `${70 + i * 12}%`,
              top: `${15 - i * 6}%`,
              left: `${15 - i * 6}%`,
            }}
          />
        ))}

        {/* Center Label */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full flex flex-col items-center justify-center"
          style={{
            background: song.color,
            boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.3)',
          }}
        >
          <Music className="w-4 h-4 text-white mb-0.5" />
          <p className="font-inter text-[7px] text-white/90 font-semibold text-center px-1 truncate w-full">
            {song.title.split(' ')[0]}
          </p>
        </div>

        {/* Shine effect */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%, transparent 100%)',
          }}
        />
      </motion.div>

      {/* Song Info */}
      <motion.div
        className="text-center mt-3"
        animate={isSelected ? { scale: 1.05 } : { scale: 1 }}
      >
        <p className="font-playfair text-xs font-semibold" style={{ color: C.textPrimary }}>
          {song.title}
        </p>
        <p className="font-caveat text-[10px] mt-0.5" style={{ color: C.textSecondary }}>
          {song.movie}
        </p>
      </motion.div>

      {/* Selected indicator */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center shadow-lg"
          style={{ background: '#A7C4A0' }}
        >
          <Check className="w-3.5 h-3.5 text-white" />
        </motion.div>
      )}
    </motion.div>
  );
}

// Playlist Summary Card Component
function PlaylistSummaryCard({ songs: selectedSongs }: { songs: typeof songs }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-xl mx-auto max-w-lg"
      style={{ border: `1px solid ${C.border}` }}
    >
      {/* Title */}
      <div className="text-center mb-4">
        <p className="font-sacramento text-2xl" style={{ color: C.accent }}>
          Gayatri's Playlist
        </p>
        <p className="font-caveat text-sm" style={{ color: C.textSecondary }}>
          {selectedSongs.length} songs selected
        </p>
      </div>

      {/* Song list */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {selectedSongs.map((song, i) => (
          <motion.div
            key={song.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3 p-2 rounded-lg"
          >
            <span
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: song.color }}
            >
              {i + 1}
            </span>
            <div className="flex-1">
              <p className="font-playfair text-sm font-semibold" style={{ color: C.textPrimary }}>
                {song.title}
              </p>
              <p className="font-caveat text-xs" style={{ color: C.textSecondary }}>
                {song.movie}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Decorative elements */}
      <div className="flex justify-center gap-2 mt-4">
        <Heart className="w-4 h-4" style={{ color: `${C.accent}30` }} />
        <Music className="w-4 h-4" style={{ color: `${C.accent}30` }} />
        <Star className="w-4 h-4" style={{ color: `${C.accent}30` }} />
      </div>
    </motion.div>
  );
}

export default function MusicSection({ onComplete, updateScore, musicScore: _musicScore }: MusicSectionProps) {
  const [phase, setPhase] = useState<'intro' | 'select' | 'complete'>('intro');
  const [selectedSongs, setSelectedSongs] = useState<number[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleExplore = () => {
    setPhase('select');
  };

  const toggleSongSelection = (songId: number) => {
    if (selectedSongs.includes(songId)) {
      setSelectedSongs(prev => prev.filter(id => id !== songId));
    } else {
      setSelectedSongs(prev => [...prev, songId]);
    }
  };

  const handleCreatePlaylist = () => {
    if (selectedSongs.length > 0) {
      updateScore(50);
      setShowConfetti(true);
      setTimeout(() => {
        setPhase('complete');
      }, 1500);
    }
  };

  const handleContinue = () => {
    onComplete();
  };

  const selectedSongDetails = selectedSongs.map(id => songs.find(s => s.id === id)).filter(Boolean) as typeof songs;

  return (
    <section
      id="music"
      className="relative py-16 md:py-24 px-4 md:px-8"
      style={{ background: C.background }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full blur-3xl" style={{ background: `${C.accent}15` }} />
        <div className="absolute bottom-40 right-20 w-60 h-60 rounded-full blur-3xl" style={{ background: '#A7C4A010' }} />

        {/* Floating music notes */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${15 + i * 20}%`,
              top: `${20 + (i % 2) * 30}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.15, 0.35, 0.15],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.8,
            }}
          >
            <Music className="w-5 h-5" style={{ color: `${C.accent}20` }} />
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="font-caveat text-lg mb-2" style={{ color: C.accent }}>
              CHAPTER 4
            </p>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-3" style={{ color: C.textPrimary }}>
              The Soundtrack <span style={{ color: C.accent }}>I Picked For You</span>
            </h2>
            <p className="font-caveat text-base" style={{ color: C.textSecondary }}>
              Select all the songs that belong in your perfect playlist.
            </p>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {/* INTRO PHASE */}
          {phase === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              {/* Intro Text */}
              <div className="text-center mb-10">
                <div
                  className="rounded-2xl p-6 md:p-8 mb-8"
                  style={{ background: C.paper, border: `1px solid ${C.border}` }}
                >
                  <p className="font-cormorant text-base md:text-lg leading-relaxed" style={{ color: C.textSecondary }}>
                    Every person has a soundtrack.
                  </p>
                  <p className="font-cormorant text-base md:text-lg leading-relaxed mt-2" style={{ color: C.textSecondary }}>
                    Some songs become memories. Some become comfort.
                  </p>
                  <p className="font-cormorant text-base md:text-lg leading-relaxed mt-2" style={{ color: C.textSecondary }}>
                    And some never leave the playlist no matter how many years pass.
                  </p>
                  <div className="my-6" style={{ borderTop: `1px dashed ${C.border}` }} />
                  <p className="font-caveat text-lg md:text-xl" style={{ color: C.accent }}>
                    These are the songs that reminded me of you.
                  </p>
                </div>

                {/* Decorative vinyl stack */}
                <div className="flex justify-center gap-3 mb-8">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, rotate: -20, y: 50 }}
                      animate={{ opacity: 0.7 - i * 0.15, rotate: i * 8, y: 0 }}
                      transition={{ delay: i * 0.2 }}
                      className="w-16 h-16 rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, #1E293B, #374151)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                      }}
                    >
                      <div className="w-7 h-7 rounded-full mx-auto mt-4" style={{ background: [C.accent, '#A7C4A0', '#B9AEDC'][i] }} />
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleExplore}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
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
                  <AudioWaveform className="w-5 h-5" />
                  <span>Open The Vinyl Wall</span>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* SELECT PHASE */}
          {phase === 'select' && (
            <motion.div
              key="select"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Instruction */}
              <div className="text-center mb-8">
                <p className="font-caveat text-lg" style={{ color: C.textSecondary }}>
                  Click on the vinyls to build your playlist. No restrictions.
                </p>
              </div>

              {/* Vinyl Wall Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 mb-10">
                {songs.map((song, index) => (
                  <VinylRecord
                    key={song.id}
                    song={song}
                    isSelected={selectedSongs.includes(song.id)}
                    onSelect={() => toggleSongSelection(song.id)}
                    index={index}
                  />
                ))}
              </div>

              {/* Selection Counter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
              >
                <div
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
                  style={{ background: C.paper, border: `1px solid ${C.border}` }}
                >
                  <Disc3 className="w-5 h-5" style={{ color: C.accent }} />
                  <span className="font-caveat text-lg" style={{ color: C.textSecondary }}>
                    {selectedSongs.length} song{selectedSongs.length !== 1 ? 's' : ''} selected
                  </span>

                  {selectedSongs.length > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center gap-1 px-3 py-1 rounded-full"
                      style={{ background: '#C8DCC650' }}
                    >
                      <Check className="w-3.5 h-3.5" style={{ color: '#059669' }} />
                      <span className="font-caveat text-sm" style={{ color: '#059669' }}>Ready!</span>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Create Playlist Button */}
              <div className="text-center">
                <motion.button
                  whileHover={selectedSongs.length > 0 ? { scale: 1.02 } : {}}
                  whileTap={selectedSongs.length > 0 ? { scale: 0.98 } : {}}
                  onClick={handleCreatePlaylist}
                  disabled={selectedSongs.length === 0}
                  style={{
                    background: selectedSongs.length > 0 ? C.textPrimary : '#D1D5DB',
                    color: selectedSongs.length > 0 ? '#FFFFFF' : '#9CA3AF',
                    border: 'none',
                    borderRadius: '999px',
                    padding: '14px 32px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontSize: '14px',
                    cursor: selectedSongs.length > 0 ? 'pointer' : 'not-allowed',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {selectedSongs.length > 0
                    ? 'Create My Playlist'
                    : 'Select at least one song'
                  }
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* COMPLETE PHASE */}
          {phase === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto"
            >
              {/* Playlist Saved Title */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center mb-10"
              >
                <motion.div
                  animate={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="inline-block mb-4"
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg mx-auto"
                    style={{ background: '#C8DCC6' }}
                  >
                    <Check className="w-7 h-7 text-white" />
                  </div>
                </motion.div>

                <h3 className="font-playfair text-2xl md:text-3xl font-bold mb-3" style={{ color: C.textPrimary }}>
                  Playlist Created
                </h3>

                <div className="flex justify-center gap-2 my-4">
                  <Star className="w-4 h-4" style={{ color: C.accent }} />
                  <Heart className="w-4 h-4" style={{ color: '#A7C4A0' }} />
                  <Star className="w-4 h-4" style={{ color: '#B9AEDC' }} />
                </div>

                <p className="font-caveat text-base" style={{ color: C.textSecondary }}>
                  Some songs stay on repeat for a reason.
                </p>
              </motion.div>

              {/* Playlist Summary Card */}
              <PlaylistSummaryCard songs={selectedSongDetails} />

              {/* Playlist Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-2xl p-5 mt-6"
                style={{ background: C.paper, border: `1px dashed ${C.accent}` }}
              >
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4" style={{ color: C.accent }} />
                  <p className="font-caveat text-base" style={{ color: C.accent }}>
                    Your Playlist Says
                  </p>
                </div>
                <p className="font-cormorant text-base text-center italic" style={{ color: C.textSecondary }}>
                  {getPlaylistSummary(selectedSongs)}
                </p>
              </motion.div>

              {/* Continue Button */}
              <div className="text-center mt-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleContinue}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
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
                  <span>Continue The Story</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Confetti show={showConfetti} />
    </section>
  );
}

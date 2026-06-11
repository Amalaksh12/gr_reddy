import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  Music, Check, Disc3, Sparkles, Heart, Star, AudioWaveform
} from 'lucide-react';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { Confetti } from '../components/CelebrationEffects';

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
    color: '#C97B8A',
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
    title: 'Pee Loon',
    movie: 'Once Upon A Time In Mumbai',
    mood: 'Late Night',
    color: '#1F2A44',
    note: '"Those midnight thoughts."'
  },
  {
    id: 7,
    title: 'Hawayein',
    movie: 'Jab Harry Met Sejal',
    mood: 'Memories',
    color: '#7D9F9A',
    note: '"Like revisiting old memories."'
  },
  {
    id: 8,
    title: 'Raabta',
    movie: 'Agent Vinod',
    mood: 'Soulful',
    color: '#B8A088',
    note: '"When souls connect."'
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
    title: 'Shayad',
    movie: 'Love Aaj Kal',
    mood: 'Hope',
    color: '#9B8AA6',
    note: '"Maybe tomorrow."'
  },
];

const playlistSummaries: Record<string, string> = {
  comfort: "Your playlist is filled with comfort, nostalgia, beautiful memories, and songs that feel like home.",
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
  isDisabled,
  index
}: {
  song: typeof songs[0];
  isSelected: boolean;
  onSelect: () => void;
  isDisabled: boolean;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: -10 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={!isDisabled ? { scale: 1.05, y: -5 } : {}}
      onClick={() => !isDisabled && onSelect()}
      className="cursor-pointer relative"
      style={{ opacity: isDisabled ? 0.4 : 1 }}
    >
      {/* Vinyl Record */}
      <motion.div
        animate={isSelected ? { rotate: 360 } : { rotate: 0 }}
        transition={isSelected ? { duration: 8, repeat: Infinity, ease: 'linear' } : { duration: 0.5 }}
        className="relative w-36 h-36 md:w-40 md:h-40 rounded-full shadow-2xl mx-auto"
        style={{
          background: 'linear-gradient(135deg, #1F2A44 0%, #374151 50%, #1F2A44 100%)',
          boxShadow: isSelected
            ? `0 8px 30px ${song.color}60, 0 0 0 4px ${song.color}40`
            : '0 8px 20px rgba(0,0,0,0.3)',
        }}
      >
        {/* Grooves */}
        {[...Array(5)].map((_, i) => (
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
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 rounded-full flex flex-col items-center justify-center"
          style={{
            background: song.color,
            boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.3)',
          }}
        >
          <Music className="w-5 h-5 text-white mb-1" />
          <p className="font-inter text-[8px] text-white/90 font-semibold text-center px-1 truncate w-full">
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
        className="text-center mt-4"
        animate={isSelected ? { scale: 1.05 } : { scale: 1 }}
      >
        <p className="font-playfair text-sm font-semibold" style={{ color: '#1F2A44' }}>
          {song.title}
        </p>
        <p className="font-caveat text-xs mt-0.5" style={{ color: '#6B7280' }}>
          {song.movie}
        </p>
        <span
          className="inline-block mt-2 px-3 py-0.5 rounded-full text-[10px] font-medium"
          style={{ background: `${song.color}20`, color: song.color }}
        >
          {song.mood}
        </span>
      </motion.div>

      {/* Selected indicator */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
          style={{ background: '#A7C4A0' }}
        >
          <Check className="w-4 h-4 text-white" />
        </motion.div>
      )}
    </motion.div>
  );
}

// Cassette Tape Component
function CassetteTape({ songs: selectedSongs }: { songs: typeof songs }) {
  const sideA = selectedSongs.slice(0, 3);
  const sideB = selectedSongs.slice(3, 5);

  return (
    <motion.div
      initial={{ scale: 0, rotate: -10 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 200 }}
      className="relative mx-auto max-w-sm"
    >
      {/* Cassette Body */}
      <div
        className="rounded-lg p-6 shadow-2xl relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #E6DDD4 0%, #FAF6F1 50%, #E6DDD4 100%)',
          border: '3px solid #C97B8A',
        }}
      >
        {/* Label Area */}
        <div
          className="rounded-lg p-4 mb-4"
          style={{ background: '#C97B8A' }}
        >
          <p className="font-sacramento text-2xl text-white text-center">
            Gayatri's Playlist
          </p>
          <div className="flex justify-center gap-1 mt-1">
            <Star className="w-3 h-3 text-white" />
            <Star className="w-3 h-3 text-white" />
            <Star className="w-3 h-3 text-white" />
          </div>
        </div>

        {/* Tape Windows */}
        <div className="flex gap-4 justify-center mb-4">
          {/* Left Reel */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 rounded-full border-4 border-gray-400"
            style={{ background: '#1F2A44' }}
          >
            <div className="w-6 h-6 rounded-full mx-auto mt-4" style={{ background: '#374151' }} />
          </motion.div>

          {/* Right Reel */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 rounded-full border-4 border-gray-400"
            style={{ background: '#1F2A44' }}
          >
            <div className="w-6 h-6 rounded-full mx-auto mt-4" style={{ background: '#374151' }} />
          </motion.div>
        </div>

        {/* Sides */}
        <div className="grid grid-cols-2 gap-4">
          {/* Side A */}
          <div className="text-center">
            <p className="font-inter text-xs font-bold mb-2" style={{ color: '#C97B8A' }}>
              SIDE A
            </p>
            <div
              className="rounded p-2"
              style={{ background: '#FAF6F1' }}
            >
              {sideA.map((song, i) => (
                <p key={i} className="font-caveat text-sm" style={{ color: '#4B5563' }}>
                  {song.title}
                </p>
              ))}
            </div>
          </div>

          {/* Side B */}
          <div className="text-center">
            <p className="font-inter text-xs font-bold mb-2" style={{ color: '#C97B8A' }}>
              SIDE B
            </p>
            <div
              className="rounded p-2"
              style={{ background: '#FAF6F1' }}
            >
              {sideB.map((song, i) => (
                <p key={i} className="font-caveat text-sm" style={{ color: '#4B5563' }}>
                  {song.title}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="flex justify-between mt-4 px-4">
          <div className="w-8 h-3 rounded" style={{ background: '#C97B8A40' }} />
          <div className="w-8 h-3 rounded" style={{ background: '#C97B8A40' }} />
        </div>
      </div>
    </motion.div>
  );
}

// Playlist Journal Page Component
function PlaylistJournalPage({ songs: selectedSongs }: { songs: typeof songs }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-white rounded-xl p-6 shadow-xl mx-auto max-w-md"
      style={{ border: '3px solid #E6DDD4' }}
    >
      {/* Paper texture */}
      <div className="absolute inset-0 paper-texture opacity-30 rounded-xl" />

      {/* Washi tape top */}
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-5 rounded"
        style={{ background: '#C97B8A', transform: 'translateX(-50%) rotate(-2deg)' }}
      />

      {/* Title */}
      <div className="relative text-center mb-4">
        <p className="font-sacramento text-2xl" style={{ color: '#C97B8A' }}>
          My Playlist
        </p>
        <p className="font-caveat text-sm" style={{ color: '#9CA3AF' }}>
          The songs I cherish
        </p>
      </div>

      {/* Song list */}
      <div className="relative space-y-2">
        {selectedSongs.map((song, i) => (
          <motion.div
            key={song.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-3 p-2 rounded-lg"
            style={{ background: '#FAF6F1' }}
          >
            <span
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: song.color, color: 'white' }}
            >
              {i + 1}
            </span>
            <div>
              <p className="font-playfair text-sm font-semibold" style={{ color: '#1F2A44' }}>
                {song.title}
              </p>
              <p className="font-caveat text-xs" style={{ color: '#6B7280' }}>
                {song.note}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-2 -right-2">
        <Heart className="w-8 h-8" style={{ color: '#C97B8A30' }} />
      </div>
      <div className="absolute -top-1 -left-1">
        <Star className="w-5 h-5" style={{ color: '#E6B98D40' }} />
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
    } else if (selectedSongs.length < 5) {
      setSelectedSongs(prev => [...prev, songId]);
    }
  };

  const handleCreatePlaylist = () => {
    if (selectedSongs.length === 5) {
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
      className="relative py-24 px-4 md:px-8 overflow-hidden bg-gradient-to-b from-scrapbook-lavender/20 via-scrapbook-blush/20 to-scrapbook-sage/10"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full blur-3xl" style={{ background: '#B9AEDC30' }} />
        <div className="absolute bottom-40 right-20 w-60 h-60 rounded-full blur-3xl" style={{ background: '#C97B8A20' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: '#A7C4A0' }} />

        {/* Floating music notes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            <Music className="w-6 h-6" style={{ color: '#C97B8A30' }} />
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <ScrollReveal className="text-center mb-16">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="inline-flex items-center justify-center p-4 rounded-full mb-6"
            style={{ background: '#D8D2F050' }}
          >
            <Disc3 className="w-10 h-10" style={{ color: '#C97B8A' }} />
          </motion.div>

          <p className="font-caveat text-xl mb-2" style={{ color: '#C97B8A' }}>
            CHAPTER 4
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4" style={{ color: '#1F2A44' }}>
            The Soundtrack <span style={{ color: '#C97B8A' }}>I Picked For You</span>
          </h2>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          {/* INTRO PHASE */}
          {phase === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl mx-auto"
            >
              {/* Intro Text */}
              <div className="text-center mb-12">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl mb-8"
                  style={{ border: '2px dashed #C97B8A' }}
                >
                  <p className="font-cormorant text-lg md:text-xl leading-relaxed" style={{ color: '#4B5563' }}>
                    Every person has a soundtrack.
                  </p>
                  <p className="font-cormorant text-lg md:text-xl leading-relaxed mt-2" style={{ color: '#4B5563' }}>
                    Some songs become memories.
                  </p>
                  <p className="font-cormorant text-lg md:text-xl leading-relaxed mt-2" style={{ color: '#4B5563' }}>
                    Some become comfort.
                  </p>
                  <p className="font-cormorant text-lg md:text-xl leading-relaxed mt-2" style={{ color: '#4B5563' }}>
                    And some never leave the playlist no matter how many years pass.
                  </p>
                  <div className="my-6" style={{ borderTop: '1px dashed #E6DDD4' }} />
                  <p className="font-caveat text-xl md:text-2xl" style={{ color: '#C97B8A' }}>
                    These are a few songs that reminded me of you.
                  </p>
                  <p className="font-caveat text-lg mt-3" style={{ color: '#6B7280' }}>
                    Pick the ones that deserve a permanent place in your playlist.
                  </p>
                </motion.div>

                {/* Decorative vinyl stack */}
                <div className="flex justify-center gap-4 mb-8">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, rotate: -20, y: 50 }}
                      animate={{ opacity: 0.6 - i * 0.15, rotate: i * 8, y: 0 }}
                      transition={{ delay: i * 0.2 }}
                      className="w-20 h-20 rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, #1F2A44, #374151)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                      }}
                    >
                      <div className="w-8 h-8 rounded-full mx-auto mt-6" style={{ background: ['#C97B8A', '#A7C4A0', '#B9AEDC'][i] }} />
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleExplore}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    background: '#1F2A44',
                    color: '#FAF6F1',
                    border: 'none',
                    borderRadius: '9999px',
                    padding: '18px 40px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    fontSize: '16px',
                    cursor: 'pointer',
                    boxShadow: '0px 10px 25px rgba(31,42,68,0.2)',
                  }}
                >
                  <AudioWaveform className="w-5 h-5" />
                  <span>Open The Playlist Journal</span>
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
              {/* Two Column Layout */}
              <div className="grid lg:grid-cols-2 gap-8 mb-10">
                {/* LEFT SIDE - Playlist Journal */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="relative"
                >
                  <div
                    className="bg-white rounded-2xl p-6 md:p-8 shadow-xl h-full"
                    style={{ border: '3px solid #E6DDD4' }}
                  >
                    {/* Paper texture */}
                    <div className="absolute inset-0 paper-texture opacity-20 rounded-2xl pointer-events-none" />

                    {/* Washi tape decorations */}
                    <div
                      className="absolute -top-3 left-8 w-20 h-5 rounded transform -rotate-3"
                      style={{ background: '#C97B8A' }}
                    />
                    <div
                      className="absolute -top-3 right-12 w-16 h-5 rounded transform rotate-6"
                      style={{ background: '#B9AEDC' }}
                    />

                    {/* Title */}
                    <div className="relative text-center mb-6">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Music className="w-5 h-5" style={{ color: '#C97B8A' }} />
                        <p className="font-sacramento text-2xl md:text-3xl" style={{ color: '#C97B8A' }}>
                          Gayatri's Playlist
                        </p>
                        <Music className="w-5 h-5" style={{ color: '#C97B8A' }} />
                      </div>
                      <p className="font-caveat text-sm" style={{ color: '#9CA3AF' }}>
                        A handpicked collection of memories
                      </p>
                    </div>

                    {/* Song List */}
                    <div className="relative space-y-3">
                      {songs.map((song, i) => (
                        <motion.div
                          key={song.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-start gap-3 p-3 rounded-lg transition-all"
                          style={{
                            background: selectedSongs.includes(song.id) ? `${song.color}15` : 'transparent',
                            borderLeft: selectedSongs.includes(song.id) ? `3px solid ${song.color}` : '3px solid transparent',
                          }}
                        >
                          <span
                            className="font-playfair text-lg font-bold min-w-[20px]"
                            style={{ color: selectedSongs.includes(song.id) ? song.color : '#9CA3AF' }}
                          >
                            {i + 1}.
                          </span>
                          <div className="flex-1">
                            <p
                              className="font-playfair text-sm font-semibold"
                              style={{ color: selectedSongs.includes(song.id) ? '#1F2A44' : '#6B7280' }}
                            >
                              {song.title}
                            </p>
                            <p className="font-caveat text-xs italic" style={{ color: '#9CA3AF' }}>
                              {song.note}
                            </p>
                          </div>
                          {selectedSongs.includes(song.id) && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-5 h-5 rounded-full flex items-center justify-center"
                              style={{ background: song.color }}
                            >
                              <Check className="w-3 h-3 text-white" />
                            </motion.div>
                          )}
                        </motion.div>
                      ))}
                    </div>

                    {/* Decorative doodles */}
                    <div className="absolute bottom-4 right-4 flex gap-2">
                      <Star className="w-4 h-4" style={{ color: '#C97B8A30' }} />
                      <Heart className="w-4 h-4" style={{ color: '#A7C4A030' }} />
                      <Sparkles className="w-4 h-4" style={{ color: '#B9AEDC30' }} />
                    </div>
                  </div>
                </motion.div>

                {/* RIGHT SIDE - Vinyl Collection */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="text-center mb-6">
                    <p className="font-sacramento text-2xl" style={{ color: '#C97B8A' }}>
                      Vinyl Collection
                    </p>
                    <p className="font-caveat text-sm" style={{ color: '#6B7280' }}>
                      Click to add to your playlist
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {songs.map((song, index) => (
                      <VinylRecord
                        key={song.id}
                        song={song}
                        isSelected={selectedSongs.includes(song.id)}
                        isDisabled={!selectedSongs.includes(song.id) && selectedSongs.length >= 5}
                        onSelect={() => toggleSongSelection(song.id)}
                        index={index}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Selection Counter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
              >
                <div className="inline-flex items-center gap-4 bg-white px-8 py-4 rounded-full shadow-lg" style={{ border: '2px solid #E6DDD4' }}>
                  <div className="flex items-center gap-2">
                    <Disc3 className="w-5 h-5" style={{ color: '#C97B8A' }} />
                    <span className="font-caveat text-xl" style={{ color: '#6B7280' }}>
                      Selected: {selectedSongs.length} / 5
                    </span>
                  </div>

                  {selectedSongs.length === 5 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center gap-1 px-3 py-1 rounded-full"
                      style={{ background: '#C8DCC650' }}
                    >
                      <Check className="w-4 h-4" style={{ color: '#059669' }} />
                      <span className="font-caveat text-sm" style={{ color: '#059669' }}>Ready!</span>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Create Playlist Button */}
              <div className="text-center">
                <motion.button
                  whileHover={selectedSongs.length === 5 ? { scale: 1.05, y: -2 } : {}}
                  whileTap={selectedSongs.length === 5 ? { scale: 0.95 } : {}}
                  onClick={handleCreatePlaylist}
                  disabled={selectedSongs.length < 5}
                  style={{
                    background: selectedSongs.length === 5 ? '#1F2A44' : '#D1D5DB',
                    color: selectedSongs.length === 5 ? '#FAF6F1' : '#9CA3AF',
                    border: 'none',
                    borderRadius: '9999px',
                    padding: '18px 40px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    fontSize: '16px',
                    cursor: selectedSongs.length === 5 ? 'pointer' : 'not-allowed',
                    boxShadow: selectedSongs.length === 5 ? '0px 10px 25px rgba(31,42,68,0.2)' : 'none',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {selectedSongs.length === 5
                    ? 'Create My Playlist'
                    : `Select ${5 - selectedSongs.length} more song${5 - selectedSongs.length !== 1 ? 's' : ''}`
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
              className="max-w-5xl mx-auto"
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
                  <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg mx-auto" style={{ background: '#C8DCC6' }}>
                    <Check className="w-8 h-8 text-white" />
                  </div>
                </motion.div>

                <h3 className="font-playfair text-3xl md:text-4xl font-bold mb-3" style={{ color: '#1F2A44' }}>
                  Playlist Saved
                </h3>

                <div className="flex justify-center gap-2 my-4">
                  <Star className="w-5 h-5" style={{ color: '#C97B8A' }} />
                  <Heart className="w-5 h-5" style={{ color: '#A7C4A0' }} />
                  <Star className="w-5 h-5" style={{ color: '#B9AEDC' }} />
                </div>

                <p className="font-caveat text-lg max-w-md mx-auto" style={{ color: '#6B7280' }}>
                  Some songs stay on repeat for a reason.
                </p>
              </motion.div>

              {/* Two Column Layout - Playlist Journal & Cassette */}
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                {/* Playlist Journal Page */}
                <PlaylistJournalPage songs={selectedSongDetails} />

                {/* Cassette Tape */}
                <CassetteTape songs={selectedSongDetails} />
              </div>

              {/* Playlist Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-6 shadow-xl max-w-lg mx-auto mb-10"
                style={{ border: '2px dashed #C97B8A' }}
              >
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5" style={{ color: '#C97B8A' }} />
                  <p className="font-caveat text-lg" style={{ color: '#C97B8A' }}>
                    Your Playlist Says
                  </p>
                </div>
                <p className="font-cormorant text-lg text-center italic" style={{ color: '#4B5563' }}>
                  {getPlaylistSummary(selectedSongs)}
                </p>
              </motion.div>

              {/* Selected Vinyls Display */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap justify-center gap-4 mb-10"
              >
                {selectedSongDetails.map((song, i) => (
                  <motion.div
                    key={song.id}
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
                    style={{
                      background: song.color,
                      boxShadow: `0 4px 15px ${song.color}50`,
                    }}
                  >
                    <Music className="w-6 h-6 text-white" />
                  </motion.div>
                ))}
              </motion.div>

              {/* Continue Button */}
              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleContinue}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: '#1F2A44',
                    color: '#FAF6F1',
                    border: 'none',
                    borderRadius: '9999px',
                    padding: '18px 40px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    fontSize: '16px',
                    cursor: 'pointer',
                    boxShadow: '0px 10px 25px rgba(31,42,68,0.2)',
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

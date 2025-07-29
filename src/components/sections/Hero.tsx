import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Code2, Briefcase, Music, Gamepad, Film, Activity } from 'lucide-react';
import { useAppStore } from '../../store';
import DiscordStatus from '../DiscordStatus';
import SpotifyNowPlaying from '../SpotifyNowPlaying';
import { Activity as ActivityType } from '../../types';

const Hero: React.FC = () => {
  const setActiveSection = useAppStore((state) => state.setActiveSection);
  const { discordUser } = useAppStore();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection('home');
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [setActiveSection]);


  console.log("Hero.tsx - discordUser.banner_url:", discordUser?.banner_url);


  const discordBadges = [
    { id: 'nitro', name: 'Discord Nitro', icon: 'https://discordresources.com/img/discordnitro.svg', class: 'bg-purple-600 text-white' },
    { id: 'partner', name: 'Discord Partner', icon: 'https://discordresources.com/img/discordpartner.svg', class: 'bg-blue-500 text-white' },
    { id: 'verified_developer', name: 'Verified Bot Developer', icon: 'https://discordresources.com/img/discordbotdev.svg', class: 'bg-blue-700 text-white' },
    { id: 'early_supporter', name: 'Early Supporter', icon: 'https://discordresources.com/img/earlysupporter.png', class: 'bg-pink-500 text-white' },
    { id: 'active_developer', name: 'Active Developer', icon: 'https://discordresources.com/img/activedeveloper.svg', class: 'bg-green-500 text-white' },
    { id: 'booster', name: 'Server Booster', icon: 'https://discordresources.com/img/boosts/discordboost9.svg', class: 'bg-red-500 text-white' },
  ];
  


  const userBadgeIds = ['nitro', 'partner', 'verified_developer', 'early_supporter' ];


  const currentActivity: ActivityType | null =
    discordUser?.activities?.find((activity) => activity.type !== 2 && activity.type !== 4) || null;


  const getActivityIcon = (type?: number) => {
    switch (type) {
      case 0:
        return <Gamepad size={16} className="text-green-500" />;
      case 1:
        return <Activity size={16} className="text-purple-500" />;
      case 3:
        return <Film size={16} className="text-green-500" />;
      case 5:
        return <Activity size={16} className="text-green-500" />;
      default:
        return <Activity size={16} className="text-green-500" />;
    }
  };


  const getActivityText = (type?: number) => {
    switch (type) {
      case 0:
        return 'Oynuyor';
      case 1:
        return 'Yayınlıyor';
      case 3:
        return 'İzliyor';
      case 5:
        return 'Yarışıyor';
      default:
        return 'Aktivite';
    }
  };

  return (
    <section id="home" ref={containerRef} className="relative min-h-screen pt-20 pb-10 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-slate-900 dark:to-blue-950">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-start gap-8 lg:flex-row">
          {/* Left Side - Enhanced Discord Profile */}
          <motion.div
            className="w-full lg:w-[450px] bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Banner with Discord Integration */}
            <div className="relative h-40 overflow-hidden">
              {discordUser?.banner_url && discordUser.banner_url.trim() ? (
                <img
                  src={discordUser.banner_url}
                  alt="Discord Banner"
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    console.error("Banner image failed to load:", discordUser.banner_url);
                    e.currentTarget.src = "https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
                  }}
                />
              ) : (
                <img
                  src="https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Default Banner"
                  className="object-cover w-full h-full"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            {/* Profile Content with Discord styling */}
            <div className="relative px-6">
              {/* Avatar with Discord style */}
              <div className="absolute -top-20 left-6">
                <div className="w-[130px] h-[130px] rounded-full border-[8px] border-white dark:border-slate-800 relative">
                  {discordUser?.avatar ? (
                    <img
                      src={`https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png?size=256`}
                      alt="Discord Avatar"
                      className="object-cover w-full h-full rounded-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-full dark:bg-slate-700">
                      <span className="text-4xl font-medium text-gray-500 dark:text-gray-400">
                        {(discordUser?.username || 'U').charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-white dark:bg-slate-800 border-[4px] border-white dark:border-slate-800 flex items-center justify-center">
                    <div
                      className={`w-5 h-5 rounded-full ${
                        discordUser?.status === 'online'
                          ? 'bg-green-500'
                          : discordUser?.status === 'idle'
                          ? 'bg-yellow-500'
                          : discordUser?.status === 'dnd'
                          ? 'bg-red-500'
                          : 'bg-gray-500'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Discord Badges */}
              <div className="absolute flex gap-1 -top-12 right-6">
                {userBadgeIds.map((badgeId, index) => {
                  const badge = discordBadges.find((b) => b.id === badgeId);
                  if (!badge) return null;

                  return (
                    <div
                      key={index}
                      className="flex items-center justify-center w-8 h-8 rounded-full tooltip-container"
                      title={badge.name}
                    >
                      <img
                        src={badge.icon}
                        alt={badge.name}
                        className="w-6 h-6"
                        onError={(e) => {
                          e.currentTarget.parentElement!.innerHTML = `<div class="w-6 h-6 rounded-full ${badge.class} flex items-center justify-center text-xs font-bold">${badge.name.charAt(0)}</div>`;
                        }}
                      />
                      <div className="tooltip">{badge.name}</div>
                    </div>
                  );
                })}
              </div>

              {/* Profile Info - Discord Style */}
              <div className="pt-24 pb-5">
                <div className="flex items-baseline gap-2 mb-3">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {discordUser?.username || 'username'}
                  </h1>
                </div>

                {/* User Badges - Discord Style */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 text-xs font-medium text-green-600 bg-green-100 rounded-md dark:bg-green-900/30 dark:text-green-400">
                    4 0 3
                  </span>
                </div>

                {/* About - Discord style note */}
                <div className="p-4 mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-slate-700/40 dark:border-slate-600/20">
                  <h3 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">ABOUT ME</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {discordUser?.about || 'Modern web deneyimleri oluşturmaya odaklanan tutkulu bir geliştirici. React, TypeScript ve Node.js ekosisteminde uzmanlaşmış full-stack developer.'}
                  </p>
                </div>

                {/* Discord Activity Status */}
                <div className="p-4 mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-slate-700/40 dark:border-slate-600/20">
                  <h3 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">ACTIVITY</h3>
                  {currentActivity ? (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {getActivityIcon(currentActivity.type)}
                        <span className="font-medium text-gray-800 dark:text-gray-200">
                          {currentActivity.name} {getActivityText(currentActivity.type)}
                        </span>
                      </div>
                      {currentActivity.details && (
                        <div className="pl-6 text-sm text-gray-700 dark:text-gray-300">
                          {currentActivity.details}
                        </div>
                      )}
                      {currentActivity.state && (
                        <div className="pl-6 text-sm text-gray-700 dark:text-gray-300">
                          {currentActivity.state}
                        </div>
                      )}
                      {currentActivity.timestamps?.start && (
                        <div className="pl-6 text-xs text-gray-500 dark:text-gray-400">
                          {new Date(currentActivity.timestamps.start).toLocaleTimeString()} tarihinden beri
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Şu anda herhangi bir aktivite yok
                    </div>
                  )}
                </div>

                {/* Spotify Integration - Discord style */}
                <div className="p-4 mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-slate-700/40 dark:border-slate-600/20">
                  <h3 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">SPOTIFY</h3>
                  <SpotifyNowPlaying />
                </div>

                {/* Roles - Discord Style */}
                <div className="mb-4">
                  <h3 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">ROLES</h3>
                  <div className="flex flex-wrap gap-2">
<span
  className="px-2 py-1 text-xs font-medium rounded-md"
  style={{ backgroundColor: 'rgba(88, 101, 242, 0.2)', color: 'rgb(88, 101, 242)' }}
>
  @toji
</span>
<span
  className="px-2 py-1 text-xs font-medium rounded-md"
  style={{ backgroundColor: 'rgba(235, 69, 158, 0.2)', color: 'rgb(235, 69, 158)' }}
>
  @aphe
</span>

                  </div>
                </div>

                {/* Social Links - Discord Style */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">BAĞLANTILAR</h3>
                  <div className="flex flex-wrap gap-3">
                    <motion.a
                      href="https://discord.gg/403"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 text-gray-700 transition-colors bg-gray-100 rounded-md dark:bg-slate-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Send size={16} />
                      <span className="text-sm font-medium">Discord</span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Enhanced Content */}
          <motion.div
            className="flex-1 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Welcome Banner */}
            <div className="p-8 bg-white shadow-xl dark:bg-slate-800 rounded-2xl">
              <h2 className="mb-4 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                Merhaba, Ben {discordUser?.username || 'Developer'}! 👋
              </h2>
              <p className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                Full-stack web geliştirme konusunda uzmanlaşmış, modern teknolojileri kullanarak yaratıcı çözümler üreten bir yazılım geliştiricisiyim.
              </p>
              <div className="flex flex-wrap gap-3">
                <motion.a
                  href="#contact"
                  className="flex items-center gap-2 px-6 py-3 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail size={18} />
                  İletişime Geç
                </motion.a>
                <motion.a
                  href="#projects"
                  className="flex items-center gap-2 px-6 py-3 font-medium text-gray-800 transition-colors bg-gray-200 rounded-lg dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 dark:text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Code2 size={18} />
                  Projeleri Gör
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tooltip styles */}
      <style jsx global>{`
        .tooltip-container {
          position: relative;
        }
        .tooltip {
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          background-color: rgba(0,0,0,0.8);
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          white-space: nowrap;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.2s, visibility 0.2s;
        }
        .tooltip-container:hover .tooltip {
          opacity: 1;
          visibility: visible;
        }
      `}</style>
    </section>
  );
};

export default Hero;

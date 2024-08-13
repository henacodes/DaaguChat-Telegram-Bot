export function generateCoolName() {
  // List of prefixes and suffixes
  const prefixes = [
    "Cyber",
    "Hyper",
    "Pixel",
    "Neon",
    "Vortex",
    "Quantum",
    "Astral",
    "Enigma",
    "Nano",
    "Techno",
    "Relic",
    "Prism",
    "Chrono",
    "Horizon",
    "Spectrum",
    "Helix",
  ];
  const suffixes = [
    "Blade",
    "Forge",
    "Spark",
    "Viper",
    "Nexus",
    "Comet",
    "Eclipse",
    "Fusion",
    "Shard",
    "Nova",
    "Void",
    "Pulse",
    "Sonic",
    "Tempest",
    "Quasar",
    "Paradigm",
  ];

  // Generate a random prefix and suffix
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

  // Combine the prefix and suffix to create the name
  return `${prefix}${suffix}`;
}

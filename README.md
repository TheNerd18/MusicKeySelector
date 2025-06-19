# Music Chord Selector

A interactive web application for exploring musical keys, chords, and their relationships. Built with React, TypeScript, and VexFlow for musical notation.

## Features

- **Key Selection**: Choose from 14 different musical keys (major keys)
- **Chord Grid**: Interactive display of all 7 chords in each key with Roman numeral notation
- **Musical Staff**: Visual representation of chords on a musical staff with:
  - Proper key signatures
  - Scale notes with highlighted chord tones
  - Color-coded tonic and dominant chords
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: All components sync automatically when changing keys or selecting chords

## Installation

### Prerequisites

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager

### Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/music-chord-selector.git
   cd music-chord-selector
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

1. **Select a Key**: Use the dropdown menu to choose your desired musical key
2. **Explore Chords**: Click on any chord in the grid to see it highlighted on the musical staff
3. **View Notation**: The musical staff shows:
   - The complete scale for the selected key
   - Highlighted notes that belong to the selected chord
   - Red notes indicating the tonic (I) and dominant (V) degrees
   - Orange notes for the selected chord

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Chakra UI** - Component library
- **VexFlow** - Musical notation rendering
- **Framer Motion** - Animations

## Project Structure

```
src/
├── components/           # React components
│   ├── ChordGrid/       # Interactive chord grid
│   ├── KeySelector/     # Key selection dropdown
│   └── MusicStave/      # Musical staff notation
├── data/
│   └── keyInfo.ts       # Musical key and chord data
├── helpers/
│   └── chordNoteMapper.ts # Chord-to-note mapping utility
└── App.tsx              # Main application component
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [VexFlow](https://github.com/0xfe/vexflow) for music notation rendering
- [Chakra UI](https://chakra-ui.com/) for the component library
- Musical theory resources and chord progression references

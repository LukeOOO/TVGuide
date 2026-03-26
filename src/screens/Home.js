import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, Image, useWindowDimensions } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [featuredShows, setFeaturedShows] = useState([]);
  const { width } = useWindowDimensions();

  // Calculate tile width to fill the screen: 4 columns, 24px padding each side, 6px gaps
  const tileGap = 6;
  const columns = 4;
  const tileWidth = (width - 48 - (tileGap * (columns - 1))) / columns;
  const tileHeight = tileWidth * 1.4;

  // Fetch a page of shows from TVMaze and pick 12 random ones to tile at the top
  useEffect(() => {
    fetch('https://api.tvmaze.com/shows?page=0')
      .then((response) => response.json())
      .then((json) => {
        // Filter to only shows that have an image, then shuffle and take 12
        const withImages = json.filter((show) => show.image);
        const shuffled = withImages.sort(() => Math.random() - 0.5);
        setFeaturedShows(shuffled.slice(0, 12));
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.heroSection}>
        {featuredShows.length > 0 ? (
          <View style={styles.posterGrid}>
            {featuredShows.map((show) => (
              <Image
                key={show.id}
                style={[styles.posterTile, { width: tileWidth, height: tileHeight }]}
                source={{ uri: show.image.medium }}
              />
            ))}
          </View>
        ) : (
          <Text style={styles.emoji}>📺</Text>
        )}
        <Text style={styles.appTitle}>TV Show Browser</Text>
        <Text style={styles.appSubtitle}>
          Search thousands of TV shows
        </Text>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          onPress={() => navigation.navigate('Browse Shows')}
        >
          <Text style={styles.buttonEmoji}>🔍</Text>
          <View>
            <Text style={styles.buttonTitle}>Browse Shows</Text>
            <Text style={styles.buttonSubtext}>Search for TV shows by name</Text>
          </View>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.button, styles.buttonOutline, pressed && styles.buttonPressed]}
          onPress={() => navigation.navigate('Browse Episodes')}
        >
          <Text style={styles.buttonEmoji}>🎬</Text>
          <View>
            <Text style={styles.buttonTitle}>Browse Episodes</Text>
            <Text style={styles.buttonSubtext}>Explore all episodes for any show</Text>
          </View>
        </Pressable>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d1a',
    justifyContent: 'center',
    padding: 24,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 50,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  posterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 20,
  },
  posterTile: {
    borderRadius: 8,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  appSubtitle: {
    fontSize: 15,
    color: '#9999bb',
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonContainer: {
    gap: 14,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7c6fff',
    padding: 20,
    borderRadius: 14,
    gap: 16,
  },
  buttonOutline: {
    backgroundColor: '#1a1a2e',
    borderWidth: 1.5,
    borderColor: '#7c6fff',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonEmoji: {
    fontSize: 28,
  },
  buttonTitle: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  buttonSubtext: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 13,
  },
});

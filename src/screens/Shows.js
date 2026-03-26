import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, FlatList,
  Image, ActivityIndicator, Pressable,
} from 'react-native';
import SearchForm from '../components/SearchForm';

export default function ShowsScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('Breaking Bad');
  const [shows, setShows] = useState(null);

  // Fetch shows from the API whenever searchQuery changes
  const searchShows = () => {
    setShows(null); // Reset to show loading indicator
    fetch('https://api.tvmaze.com/search/shows?q=' + searchQuery)
      .then((response) => response.json())
      .then((json) => {
        setShows(json);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    searchShows();
  }, [searchQuery]);

  return (
    <View style={styles.showsScreen}>

      <SearchForm
        placeholder="Search TV shows..."
        initialValue={searchQuery}
        onSearch={setSearchQuery}
      />

      {shows && shows.length > 0 ? (
        <FlatList
          data={shows}
          keyExtractor={(item) => item.show.id.toString()}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <Pressable
              style={({ pressed }) => [styles.showCard, pressed && { opacity: 0.85 }]}
              onPress={() =>
                navigation.navigate('Show Details', {
                  showId: item.show.id,
                  showName: item.show.name,
                })
              }
            >
              {/* Show Poster */}
              {item.show.image ? (
                <Image
                  style={styles.showThumbnail}
                  source={{ uri: item.show.image.medium }}
                />
              ) : (
                <View style={[styles.showThumbnail, styles.noImage]}>
                  <Text style={styles.noImageText}>No{'\n'}Image</Text>
                </View>
              )}

              {/* Show Info */}
              <View style={styles.showInfo}>
                <Text style={styles.showName} numberOfLines={1}>
                  {item.show.name}
                </Text>
                <Text style={styles.showGenres} numberOfLines={1}>
                  {item.show.genres.length > 0
                    ? item.show.genres.slice(0, 3).join(' · ')
                    : 'Unknown Genre'}
                </Text>
                <Text style={styles.showRating}>
                  ⭐ {item.show.rating.average || 'N/A'}
                </Text>
                <Text style={[
                  styles.showStatus,
                  item.show.status === 'Running' && styles.statusRunning,
                ]}>
                  {item.show.status}
                </Text>
              </View>

              {/* Arrow */}
              <Text style={styles.arrow}>›</Text>
            </Pressable>
          )}
        />
      ) : shows && shows.length === 0 ? (
        <View style={styles.centreMessage}>
          <Text style={styles.centreMessageText}>No shows found.</Text>
        </View>
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#7c6fff" />
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  showsScreen: {
    flex: 1,
    backgroundColor: '#0d0d1a',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centreMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centreMessageText: {
    color: '#9999bb',
    fontSize: 16,
  },
  listContent: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  showCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    marginBottom: 10,
    overflow: 'hidden',
  },
  showThumbnail: {
    width: 75,
    height: 105,
  },
  noImage: {
    backgroundColor: '#2a2a3e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    color: '#555577',
    fontSize: 11,
    textAlign: 'center',
  },
  showInfo: {
    flex: 1,
    padding: 12,
    gap: 4,
  },
  showName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  showGenres: {
    color: '#7c6fff',
    fontSize: 12,
  },
  showRating: {
    color: '#ffd700',
    fontSize: 13,
  },
  showStatus: {
    color: '#9999bb',
    fontSize: 12,
  },
  statusRunning: {
    color: '#4caf50',
  },
  arrow: {
    color: '#7c6fff',
    fontSize: 28,
    paddingRight: 14,
  },
});

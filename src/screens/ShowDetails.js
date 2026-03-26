import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, Image, ScrollView,
  ActivityIndicator, Pressable, Linking,
} from 'react-native';
import { stripHtml } from '../utils';

export default function ShowDetailsScreen({ route, navigation }) {
  const { showId, showName } = route.params;
  const [showData, setShowData] = useState(null);

  // Fetch full show data from TVMaze using the show ID
  const getShowData = () => {
    fetch('https://api.tvmaze.com/shows/' + showId)
      .then((response) => response.json())
      .then((json) => {
        setShowData(json);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getShowData();
  }, [showId]);

  // Show loading indicator while waiting for the API response
  if (!showData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7c6fff" />
        <Text style={styles.loadingText}>Loading {showName}...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>

      {/* Show Poster */}
      {showData.image ? (
        <Image
          style={styles.showImage}
          source={{ uri: showData.image.original }}
        />
      ) : (
        <View style={styles.noImagePlaceholder}>
          <Text style={styles.noImageText}>No Image Available</Text>
        </View>
      )}

      <View style={styles.detailsContainer}>

        {/* Title */}
        <Text style={styles.showName}>{showData.name}</Text>

        {/* Badges Row */}
        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>⭐ {showData.rating.average || 'N/A'}</Text>
          </View>
          <View style={[styles.badge, showData.status === 'Running' && styles.badgeGreen]}>
            <Text style={styles.badgeText}>{showData.status}</Text>
          </View>
          {showData.runtime ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{showData.runtime} min</Text>
            </View>
          ) : null}
        </View>

        {/* Genres */}
        {showData.genres.length > 0 && (
          <Text style={styles.genres}>{showData.genres.join(' · ')}</Text>
        )}

        {/* Network & Premiere Date */}
        {showData.network && (
          <Text style={styles.metaText}>📡  {showData.network.name}</Text>
        )}
        {showData.premiered && (
          <Text style={styles.metaText}>📅  Premiered {showData.premiered}</Text>
        )}
        {showData.ended && (
          <Text style={styles.metaText}>🏁  Ended {showData.ended}</Text>
        )}

        {/* Divider */}
        <View style={styles.divider} />

        {/* Summary */}
        <Text style={styles.sectionHeading}>About</Text>
        <Text style={styles.summary}>{stripHtml(showData.summary)}</Text>

        {/* Official Site Link */}
        {showData.officialSite && (
          <Pressable
            style={styles.linkButton}
            onPress={() => Linking.openURL(showData.officialSite)}
          >
            <Text style={styles.linkButtonText}>🌐  Official Website</Text>
          </Pressable>
        )}

        {/* View Episodes Button */}
        <Pressable
          style={({ pressed }) => [styles.episodesButton, pressed && { opacity: 0.85 }]}
          onPress={() =>
            navigation.navigate('Browse Episodes', {
              screen: 'Browse Episodes',
              params: { showId: showData.id, showName: showData.name },
            })
          }
        >
          <Text style={styles.episodesButtonText}>🎬  View All Episodes</Text>
        </Pressable>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d1a',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0d0d1a',
    gap: 12,
  },
  loadingText: {
    color: '#9999bb',
    fontSize: 14,
  },
  showImage: {
    width: '100%',
    height: 380,
    resizeMode: 'cover',
  },
  noImagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#1a1a2e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    color: '#555577',
    fontSize: 14,
  },
  detailsContainer: {
    padding: 20,
  },
  showName: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  badge: {
    backgroundColor: '#1a1a2e',
    borderWidth: 1,
    borderColor: '#7c6fff',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  badgeGreen: {
    borderColor: '#4caf50',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 13,
  },
  genres: {
    color: '#7c6fff',
    fontSize: 14,
    marginBottom: 10,
  },
  metaText: {
    color: '#9999bb',
    fontSize: 14,
    marginBottom: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#2a2a4e',
    marginVertical: 18,
  },
  sectionHeading: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  summary: {
    color: '#ccccdd',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20,
  },
  linkButton: {
    marginBottom: 12,
  },
  linkButtonText: {
    color: '#7c6fff',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  episodesButton: {
    backgroundColor: '#7c6fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 36,
  },
  episodesButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

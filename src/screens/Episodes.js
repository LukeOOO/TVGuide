import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, FlatList,
  ActivityIndicator,
} from 'react-native';
import SearchForm from '../components/SearchForm';
import { stripHtml } from '../utils';

export default function EpisodesScreen({ route }) {
  const [showId, setShowId] = useState(route?.params?.showId || null);
  const [showName, setShowName] = useState(route?.params?.showName || '');
  const [episodes, setEpisodes] = useState(null);

  // Step 1: Search API for a show name to get its ID
  const searchForShow = (query) => {
    setEpisodes(null);
    fetch('https://api.tvmaze.com/search/shows?q=' + query)
      .then((response) => response.json())
      .then((json) => {
        if (json && json.length > 0) {
          setShowId(json[0].show.id);
          setShowName(json[0].show.name);
        } else {
          setEpisodes([]); // No results found
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Step 2: Once we have a showId, fetch all episodes for that show
  const getEpisodes = () => {
    if (!showId) return;
    fetch('https://api.tvmaze.com/shows/' + showId + '/episodes')
      .then((response) => response.json())
      .then((json) => {
        setEpisodes(json);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Re-run whenever the showId param changes
  // Handle first load — defaults to Breaking Bad if no params are passed
  useEffect(() => {
    if (route?.params?.showId) {
      setShowId(route.params.showId);
      setShowName(route.params.showName || '');
    } else {
      searchForShow('Breaking Bad');
    }
  }, [route?.params?.showId]);

  // Whenever showId changes, fetch that show's episodes
  useEffect(() => {
    getEpisodes();
  }, [showId]);

  return (
    <View style={styles.episodesScreen}>

      <SearchForm
        placeholder="Search for a show..."
        initialValue={showName}
        onSearch={searchForShow}
      />

      {/* Show currently loaded show name */}
      {showName ? (
        <View style={styles.showTitleBar}>
          <Text style={styles.showTitleText}>📺  {showName}</Text>
        </View>
      ) : null}

      {episodes && episodes.length > 0 ? (
        <FlatList
          data={episodes}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.episodeCard}>

              {/* Season & Episode Number */}
              <View style={styles.episodeNumber}>
                <Text style={styles.episodeNumberText}>
                  S{String(item.season).padStart(2, '0')}
                </Text>
                <Text style={styles.episodeNumberText}>
                  E{String(item.number).padStart(2, '0')}
                </Text>
              </View>

              {/* Episode Info */}
              <View style={styles.episodeInfo}>
                <Text style={styles.episodeName} numberOfLines={1}>
                  {item.name}
                </Text>
                {item.airdate ? (
                  <Text style={styles.episodeDate}>{item.airdate}</Text>
                ) : null}
                {item.runtime ? (
                  <Text style={styles.episodeDuration}>{item.runtime} min</Text>
                ) : null}
                {item.summary ? (
                  <Text style={styles.episodeSummary} numberOfLines={2}>
                    {stripHtml(item.summary)}
                  </Text>
                ) : null}
              </View>

            </View>
          )}
        />
      ) : episodes && episodes.length === 0 ? (
        <View style={styles.centreMessage}>
          <Text style={styles.centreMessageText}>No episodes found.</Text>
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
  episodesScreen: {
    flex: 1,
    backgroundColor: '#0d0d1a',
  },
  showTitleBar: {
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a4e',
  },
  showTitleText: {
    color: '#7c6fff',
    fontSize: 15,
    fontWeight: 'bold',
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
  episodeCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    marginBottom: 8,
    overflow: 'hidden',
    alignItems: 'stretch',
  },
  episodeNumber: {
    backgroundColor: '#7c6fff',
    paddingHorizontal: 12,
    paddingVertical: 14,
    minWidth: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  episodeNumberText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  episodeInfo: {
    flex: 1,
    padding: 12,
    gap: 3,
  },
  episodeName: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  episodeDate: {
    color: '#9999bb',
    fontSize: 12,
  },
  episodeDuration: {
    color: '#7c6fff',
    fontSize: 12,
  },
  episodeSummary: {
    color: '#777799',
    fontSize: 12,
    lineHeight: 17,
    marginTop: 2,
  },
});

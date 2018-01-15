const assert = require('assert');
const expect = require('chai').expect;
const plexApi = require('./plexAPI');

describe('Plex Metadata Update', function() {

  describe('getDocus()', function() {
    it('should return at least one element', function() {
      return plexApi.getDocus()
        .then( docus => assert.notEqual(0, docus.length) )
    });
  });

  describe('getWatchLaterVideos', function () {
    it('should return an object with a "MediaContainer" attribute', function () {
      return plexApi.getWatchLaterVideos()
        .then( result => {
          assert.notStrictEqual(undefined, result.MediaContainer)
        })
    })
  })

  describe('updateMetadata()', function() {
    it('should not throw', function () {
      expect(function() {
        plexApi.updateMetadata(14702,
          {
          id: "someFakeYouTubeVideoId (from test runner)",
          snippet: {
            publishedAt: "2015-01-01",
            channelTitle: "some channel title (from test runner)",
            channelId: "someChannelId (from test runner)",
            description: "summary (from test runner)"
          }
        })  
      }).to.not.throw();      
    })    
  })

});
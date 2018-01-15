# Roadmap

## authentication
I can't push this to a public remote git repo until my username & password are harcoded in here.

- try token
- or command line args 
- or readline prompts

## plexAPI.updateMetada()
allow to update following metadata:
- [x] channel name & id
- [x] oringinal video link
- [x] publication date year
- [x] video summary/description
- [ ] metatags

### Notes for implementing the metatags update


This is a piece of the queryString when updating metadata from the Plex UI.

####RAW encoded string

```
&collection%5B0%5D.tag.tag=europe&collection%5B1%5D.tag.tag=lobbies&studio.locked=1&tagline.locked=1&summary.locked=1&originallyAvailableAt.locked=1&year.locked=1&writer.locked=1&collection.locked=1&X-Plex-Product=Plex%20Web&X-Plex-Version=3.23.1&X-Plex-Client-Identifier=ctlzv903i3aouimp31peaxr3&X-Plex-Platform=Chrome&X-Plex-Platform-Version=62.0&X-Plex-Device=OSX&X-Plex-Device-Name=Plex%20Web%20%28Chrome%29&X-Plex-Device-Screen-Resolution=1920x935%2C1920x1080&X-Plex-Token=DKXoHtTaE3FuaiNMurCz
```

####Same as above, but decoded
```
&collection[0].tag.tag=europe&collection[1].tag.tag=lobbies&studio.locked=1&tagline.locked=1&summary.locked=1&originallyAvailableAt.locked=1&year.locked=1&writer.locked=1&collection.locked=1&X-Plex-Product=Plex Web&X-Plex-Version=3.23.1&X-Plex-Client-Identifier=ctlzv903i3aouimp31peaxr3&X-Plex-Platform=Chrome&X-Plex-Platform-Version=62.0&X-Plex-Device=OSX&X-Plex-Device-Name=Plex Web (Chrome)&X-Plex-Device-Screen-Resolution=1920x935,1920x1080&X-Plex-Token=DKXoHtTaE3FuaiNMurCz
```

#### This is the `YTVideo.tags` Array avaible on `/src plexApi.js.updateMetadata()`
```
[
    0:"osons causer"
    1:"osonscauser"
    2:"europe"
    3:"lobby europe"
    4:"lobbies europe"
    5:"union europeenne critique"
    6:"pouvoir lobby"
    7:"pouvoir lobbies"
    8:"démocratie ue"
    9:"démocratie europe"
    10:"verhofstadt"
]
```





## Open Email Event Listener!!


# Optimization

here are the few Optimization I adopted to maximize the handling incoming request to the "/event" endpoint.

- **Prevent Memory Leak:-**
    - setting an periodically Function which check on every 2 min whenever EventStore size exceed 500 , will delete intial 100 events from EventStore.

- **Success Rate :-** endpoint handle 560+ request per min out of 600 incoming request shows 92%+ success rate.

- **Optimal Data Structure :-**
    - `EventStore Map` 
        - stored sorted event based on timestamp.
        - Minimal insertion and deletion time as event are sorted  as timestamp.

## Screenshots



---
title: '6.5840: Distributed Computer Systems Engineering'
image: assets/img/raft.png
imagealt: A smiling raft.
---

We learned how to build a [Raft](https://raft.github.io/)! And implemented a sharded, fault-tolerant key value store using Raft in Go. :)

From the course catalog: Abstractions and implementation techniques for engineering distributed systems: remote procedure call, threads and locking, client/server, peer-to-peer, consistency, fault tolerance, and security. Readings from current literature. Individual laboratory assignments in Go culminate in the construction of a fault-tolerant and scalable network file system.

[Course Website](https://pdos.csail.mit.edu/6.824/schedule.html)

## Table of Contents
Since tests were open book, the "cheatsheets" are more just like table of contents, so I didn't make a separate section for them.

- **Class 1**: MapReduce  
- **Go Guidance**: Cheatsheet, Style, Locking, Debugging  
- **Class 2**: Go Tutorial, RPC, Threads  
- **Lab 1**: MapReduce with Go RPCs  
- **Class 3**: VM-FT (VMware), Primary-Backup Replication  
- **Class 4**: Consistency and Linearizability  
- **Lab 2**: Linearizable key-value store (single machine)  

- **Class 5**: Raft Part 1, Leader Election  
- **Class 6**: Common Go Patterns  
- **Class 7**: Raft Part 2, Log, Persistence, Snapshots  
- **Raft Guidance**: Raft structure and debugging  
- **Lab 3A–3D**: Raft leader election, log, persistence, snapshots  

- **Class 8**: Google File System (GFS)  
- **Class 9**: Zookeeper (Wait-free filesystem coordination)  
- **Class 10**: Two-Phase Locking, Two-Phase Commit  
- **Class 11**: Raft Lab 3A–B Q&A, Many vs. one thread solution  
- **Class 12**: Spanner (Google's globally distributed database)  
- **[Midterm Cheatsheet](https://docs.google.com/document/d/1-cPYiJ0HjO4b8neBFZZQJSHfcWzilRk2swZjgn_5VmU/edit?usp=sharing)**: (basically just this table of contents)  

- **Class 13**: FaRM (Fast Remote Memory), RDMA (Remote DMA)  
- **Class 14**: Chardonnay, Epochs, Fast 2PC (eRPC, NVMe)  
- **Class 15**: Grove, Distributed System Verification, CSL (Concurrent Separation Logic)  
- **Lab 4**: Fault-tolerant key-value store using Raft  

- **Class 16**: Memcache at Facebook, Caching, User-facing Data  
- **Class 17**: Amazon DynamoDB, NoSQL Transactions  
- **Class 18**: AWS Lambda, FaaS (Function-as-a-Service), Docker Container Caching  
- **Class 19**: Ray, Ownership, Distributed Futures  
- **Class 20**: SUNDR (Secure Untrusted Data Repository), Fork Consistency  
- **Lab 5**: Sharded key-value service using RSM & Raft  

- **Class 21**: Bitcoin, Proof-of-work  
- **Class 22**: PBFT (Practical Byzantine Fault Tolerance), Byzantine Generals Problem  
- **Class 23**: Project presentations  
- **[Final Cheatsheet](https://docs.google.com/document/d/1o2uK7dAOwB31pxvNNXVcA2bnYdB5Ya9LjDjFtL0G_-I/edit?usp=sharing)**: (basically just this table of contents, again)

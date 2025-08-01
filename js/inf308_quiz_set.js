// js/inf308_quiz_set.js

// This object will be added to the global window.quizSets object.
// The key 'inf308' must match the '?set=inf308' in the index.html link.
window.quizSets = window.quizSets || {};

window.quizSets.inf308 = {
    title: "INF 308: Network Computing II",
    questions: [
        {
            question: "Q1. Line coding is a method used to represent digital data on a ________ medium.",
            options: ["Optical", "Electrical", "Physical", "Mechanical"],
            correct: "B"
        },
        {
            question: "Q2. Which line coding scheme ensures there are no long sequences of zeros?",
            options: ["NRZ", "Manchester encoding", "Differential Manchester", "RZ"],
            correct: "B"
        },
        {
            question: "Q3. Non-Return to Zero (NRZ) line coding can be either ____ or ____.",
            options: ["Unipolar, Bipolar", "Synchronous, Asynchronous", "Unipolar, Polar", "Positive, Negative"],
            correct: "C"
        },
        {
            question: "Q4. In Bipolar NRZ, the signal levels alternate between positive and negative for different bits.",
            options: ["True", "False"],
            correct: "A"
        },
        {
            question: "Q5. Manchester encoding is commonly used in which network technology?",
            options: ["Ethernet", "Wi-Fi", "Bluetooth", "GSM"],
            correct: "A"
        },
        {
            question: "Q6. In ____ coding, a binary '1' is represented by a transition, and a binary '0' by no transition.",
            options: ["NRZ", "Manchester", "RZ", "Biphase"],
            correct: "A"
        },
        {
            question: "Q7. The main disadvantage of NRZ encoding is ____.",
            options: ["DC component", "High bandwidth requirement", "Signal synchronization", "Complexity"],
            correct: "A"
        },
        {
            question: "Q8. Return-to-Zero (RZ) coding requires less bandwidth than NRZ.",
            options: ["True", "False"],
            correct: "B"
        },
        {
            question: "Q9. Which encoding method uses three voltage levels: positive, zero, and negative?",
            options: ["Polar NRZ", "Bipolar RZ", "AMI", "HDB3"],
            correct: "C"
        },
        {
            question: "Q10. In ____ encoding, each bit has a transition in the middle of the bit period.",
            options: ["Manchester", "Differential Manchester", "NRZ", "4B/5B"],
            correct: "A"
        },
        {
            question: "Q11. The main goal of Business Continuity Planning is to",
            options: ["Increase profitability", "Reduce downtime", "Cut operational costs", "Improve product quality"],
            correct: "B"
        },
        {
            question: "Q12. Business Continuity Planning focuses solely on IT systems and data.",
            options: ["True", "False"],
            correct: "B"
        },
        {
            question: "Q13. The process of identifying the critical functions of a business and the impact of a disruption is called",
            options: ["Risk assessment", "Business impact analysis (BIA)", "Disaster recovery", "Vulnerability assessment"],
            correct: "B"
        },
        {
            question: "Q14. Which of the following is NOT a component of a Business Continuity Plan?",
            options: ["Data backup plan", "Disaster recovery plan", "Employee performance evaluation", "Emergency response plan"],
            correct: "C"
        },
        {
            question: "Q15. BCP should be tested regularly to ensure effectiveness.",
            options: ["True", "False"],
            correct: "A"
        },
        {
            question: "Q16. A ____ plan is a subset of the Business Continuity Plan and focuses on restoring IT systems after a disaster.",
            options: ["Crisis management", "Risk management", "Disaster recovery", "Operational recovery"],
            correct: "C"
        },
        {
            question: "Q17. The BCP document should be",
            options: ["Confidential", "Publicly accessible", "Simple and brief", "Regularly updated"],
            correct: "D"
        },
        {
            question: "Q18. Business Continuity Planning is only important for large organizations.",
            options: ["True", "False"],
            correct: "B"
        },
        {
            question: "Q19. A critical first step in Business Continuity Planning is",
            options: ["Implementation of backup systems", "Employee training", "Conducting a Business Impact Analysis (BIA)", "Developing a disaster recovery plan"],
            correct: "C"
        },
        {
            question: "Q20. The ____ is responsible for activating the Business Continuity Plan during an incident.",
            options: ["CEO", "Business Continuity Coordinator", "IT Manager", "Human Resources Director"],
            correct: "B"
        },
        {
            question: "Q21. Disaster Recovery Planning primarily focuses on",
            options: ["Human resources", "Physical security", "IT infrastructure and data", "Financial auditing"],
            correct: "C"
        },
        {
            question: "Q22. Disaster Recovery Planning is a subset of Business Continuity Planning.",
            options: ["True", "False"],
            correct: "A"
        },
        {
            question: "Q23. The time it takes to restore business operations after a disaster is known as the",
            options: ["Recovery Time Objective (RTO)", "Recovery Point Objective (RPO)", "Maximum Tolerable Downtime (MTD)", "Recovery Window"],
            correct: "A"
        },
        {
            question: "Q24. Which of the following is the key goal of a Disaster Recovery Plan?",
            options: ["Minimize the damage to physical infrastructure", "Restore critical IT systems and data", "Improve employee morale", "Enhance customer service"],
            correct: "B"
        },
        {
            question: "Q25. A Disaster Recovery Plan should include both preventative and corrective measures.",
            options: ["True", "False"],
            correct: "A"
        },
        {
            question: "Q26. ____ refers to the maximum acceptable amount of data loss measured in time.",
            options: ["RTO", "RPO", "MTD", "DRP"],
            correct: "B"
        },
        {
            question: "Q27. Which of the following is a typical component of a Disaster Recovery Plan?",
            options: ["Vendor management strategy", "Backup and restoration procedures", "Employee retirement plans", "Marketing strategies"],
            correct: "B"
        },
        {
            question: "Q28. Testing a Disaster Recovery plan is necessary only after significant changes in the IT environment.",
            options: ["True", "False"],
            correct: "B"
        },
        {
            question: "Q29. An ____ is a secondary location where business operations can resume after a disaster.",
            options: ["Offsite storage", "Alternative worksite", "Backup location", "Remote office"],
            correct: "B"
        },
        {
            question: "Q30. Which of the following is NOT typically a part of Disaster Recovery Planning?",
            options: ["IT backup strategies", "Emergency response team", "Financial audit planning", "Data restoration procedures"],
            correct: "C"
        },
        {
            question: "Q31. The primary purpose of data backup is to ____.",
            options: ["save storage space", "protect against data loss", "improve network speed", "increase data access"],
            correct: "B"
        },
        {
            question: "Q32. Incremental backups only save the data that has changed since the last backup.",
            options: ["True", "False"],
            correct: "A"
        },
        {
            question: "Q33. A ____ backup involves copying all selected data, regardless of previous backups.",
            options: ["Full", "Incremental", "Differential", "Partial"],
            correct: "A"
        },
        {
            question: "Q34. Which backup method requires the most storage space?",
            options: ["Incremental", "Differential", "Full", "Mirroring"],
            correct: "C"
        },
        {
            question: "Q35. Differential backups require less time to restore than incremental backups.",
            options: ["True", "False"],
            correct: "A"
        },
        {
            question: "Q36. ____ is the practice of keeping multiple copies of backup data in different locations.",
            options: ["Backup rotation", "Data replication", "Offsite backup", "Data redundancy"],
            correct: "C"
        },
        {
            question: "Q37. Which of the following is NOT a best practice for data backups?",
            options: ["Regular testing of backups", "Storing backups in the same physical location as the original data", "Keeping backups encrypted", "Maintaining backup documentation"],
            correct: "B"
        },
        {
            question: "Q38. Cloud backups can provide faster recovery times compared to traditional on-premise backups.",
            options: ["True", "False"],
            correct: "B"
        },
        {
            question: "Q39. A ____ strategy involves creating multiple backups at different intervals to balance between storage use and data protection.",
            options: ["Incremental backup", "3-2-1 backup", "RAID", "Continuous data protection"],
            correct: "A"
        },
        {
            question: "Q40. Which of the following is essential for a reliable backup system?",
            options: ["Regular testing and validation", "Storing backups on a single server", "Using non-encrypted storage", "Ignoring backup documentation"],
            correct: "A"
        },
        {
            question: "Q41. Fault tolerance in a network refers to the ability to ____.",
            options: ["Automatically recover from failures", "Prevent any data loss", "Eliminate all network errors", "Detect network intrusions"],
            correct: "A"
        },
        {
            question: "Q42. Redundant systems are a key component of fault tolerance.",
            options: ["True", "False"],
            correct: "A"
        },
        {
            question: "Q43. The ____ mechanism allows a system to continue functioning when one of its components fails.",
            options: ["Redundancy", "Load balancing", "Data backup", "Compression"],
            correct: "A"
        },
        {
            question: "Q44. Which of the following is NOT a method of achieving fault tolerance?",
            options: ["RAID", "Load balancing", "Data encryption", "Redundant power supplies"],
            correct: "C"
        },
        {
            question: "Q45. A fault-tolerant system guarantees zero downtime.",
            options: ["True", "False"],
            correct: "B"
        },
        {
            question: "Q46. ____ systems can detect faults and take corrective action without human intervention.",
            options: ["Reactive", "Proactive", "Autonomous", "Manual"],
            correct: "C"
        },
        {
            question: "Q47. Which of the following is crucial for a fault-tolerant network?",
            options: ["Single points of failure", "Centralized control", "Multiple paths for data", "Minimal redundancy"],
            correct: "C"
        },
        {
            question: "Q48. Routers and Switch have the same function except for speed.",
            options: ["True", "False"],
            correct: "B"
        },
        {
            question: "Q49. Address Resolution Protocol is a Broadcast protocol.",
            options: ["True", "False"],
            correct: "A"
        },
        {
            question: "Q50. In terms of speed, Asymmetric encryption is better than symmetric.",
            options: ["True", "False"],
            correct: "B"
        },
        {
            question: "Q51. The first step in network troubleshooting is to ____.",
            options: ["Replace faulty hardware", "Identify the problem", "Check the cables", "Restart the network devices"],
            correct: "B"
        },
        {
            question: "Q52. The OSI model can be used as a framework for network troubleshooting.",
            options: ["True", "False"],
            correct: "A"
        },
        {
            question: "Q53. ____ is the process of checking physical connections, like cables and ports, during network troubleshooting.",
            options: ["Software diagnostics", "Hardware verification", "Network scanning", "Layer 1 troubleshooting"],
            correct: "D"
        },
        {
            question: "Q54. Which of the following is NOT a common network troubleshooting tool?",
            options: ["Ping", "Traceroute", "Wireshark", "Photoshop"],
            correct: "D"
        },
        {
            question: "Q55. Rebooting a device is often a first step in resolving network issues.",
            options: ["True", "False"],
            correct: "A"
        },
        {
            question: "Q56. The ____ command is used to determine the path packets take from one network device to another.",
            options: ["Ping", "Traceroute", "Netstat", "Nslookup"],
            correct: "B"
        },
        {
            question: "Q57. Which layer of the OSI model is primarily concerned with diagnosing IP addressing issues?",
            options: ["Layer 1", "Layer 2", "Layer 3", "Layer 4"],
            correct: "C"
        },
        {
            question: "Q58. Network documentation is not necessary for effective troubleshooting.",
            options: ["True", "False"],
            correct: "B"
        },
        {
            question: "Q59. A ____ network issue typically affects only a single device or user.",
            options: ["Localized", "System-wide", "Pervasive", "Peripheral"],
            correct: "A"
        },
        {
            question: "Q60. Which of the following should be done after a network issue is resolved?",
            options: ["Delete all logs", "Document the issue and solution", "Increase network load", "Disable monitoring"],
            correct: "B"
        },
        {
            question: "Q61. ____ encoding combines the features of NRZ and RZ to offer higher synchronization.",
            options: ["AMI", "Manchester", "4B/5B", "Differential Manchester"],
            correct: "B"
        },
        {
            question: "Q62. NRZ-L encoding represents a binary '1' with a high level and a binary '0' with a low level.",
            options: ["True", "False"],
            correct: "A"
        },
        {
            question: "Q63. The main advantage of using Differential Manchester encoding is ____.",
            options: ["Lower bandwidth requirement", "Simplified decoding", "Clock synchronization", "Error detection"],
            correct: "C"
        },
        {
            question: "Q64. In ____ encoding, a binary '0' is represented by no transition, while a binary '1' is represented by a transition.",
            options: ["Manchester", "Differential Manchester", "AMI", "NRZ-I"],
            correct: "D"
        },
        {
            question: "Q65. AMI (Alternate Mark Inversion) is a unipolar encoding technique.",
            options: ["True", "False"],
            correct: "B"
        },
        {
            question: "Q66. The major drawback of Bipolar encoding schemes is",
            options: ["Complex implementation", "High DC component", "Signal degradation over long distances", "Loss of synchronization"],
            correct: "D"
        },
        {
            question: "Q67. ____ coding uses more signal levels to represent bits, allowing more data to be sent in the same bandwidth.",
            options: ["Multilevel", "Unipolar", "Polar", "Bipolar"],
            correct: "A"
        },
        {
            question: "Q68. Line coding is independent of the medium used for transmission.",
            options: ["True", "False"],
            correct: "B"
        },
        {
            question: "Q69. Which line coding method is used in USB communication?",
            options: ["NRZ-L", "Manchester", "8B/10B", "4B/5B"],
            correct: "A"
        },
        {
            question: "Q70. The ____ in line coding refers to the process of converting binary data into a digital signal suitable for transmission.",
            options: ["Modulation", "Encoding", "Multiplexing", "Demodulation"],
            correct: "B"
        },
        {
            question: "Q71. A Business Continuity Plan should cover not only IT systems but also ____ and ____.",
            options: ["Marketing, Sales", "Physical assets, Human resources", "Human resources, Finance, Operations", "Research, Development"],
            correct: "C"
        },
        {
            question: "Q72. The BCP should be designed to recover operations within the organization's maximum tolerable downtime (MTD).",
            options: ["True", "False"],
            correct: "A"
        },
        {
            question: "Q73. The process of reviewing and testing the Business Continuity Plan should be performed",
            options: ["Annually", "Bi-annually", "Quarterly", "Continuously"],
            correct: "D"
        },
        {
            question: "Q74. ____ is the ongoing process of identifying and analyzing risks to business continuity.",
            options: ["Risk assessment", "Business impact analysis", "Threat modeling", "Disaster recovery planning"],
            correct: "A"
        },
        {
            question: "Q75. Communication plans are a vital part of the Business Continuity Plan.",
            options: ["True", "False"],
            correct: "A"
        },
        {
            question: "Q76. The success of a BCP largely depends on",
            options: ["The size of the company", "The clarity of roles and responsibilities", "The financial investment", "The availability of external resources"],
            correct: "B"
        },
        {
            question: "Q77. The BCP should be aligned with the organization's ____ strategy.",
            options: ["Marketing", "Growth", "Risk management", "Investment"],
            correct: "C"
        },
        {
            question: "Q78. Every employee in an organization needs to be aware of the BCP.",
            options: ["True", "False"],
            correct: "A"
        },
        {
            question: "Q79. ____ testing involves simulating a disaster scenario to evaluate the effectiveness of the BCP.",
            options: ["Desk check", "Simulation", "Parallel testing", "Full-scale"],
            correct: "D"
        },
        {
            question: "Q80. Which of the following is essential for maintaining an effective BCP?",
            options: ["Keeping it confidential from employees", "Regular updates and revisions", "Minimizing the scope to critical functions only", "Delegating responsibility to a single department"],
            correct: "B"
        },
        {
            question: "Q81. ____ plans should be in place for different types of disasters such as natural, technical, and human-made.",
            options: ["financial", "Marketing", "Contingency", "Communication"],
            correct: "C"
        },
        {
            question: "Q82. Disaster Recovery Planning should focus solely on recovering IT infrastructure.",
            options: ["True", "False"],
            correct: "B"
        },
        {
            question: "Q83. A ____ assessment identifies the probability and impact of various disasters.",
            options: ["Risk", "Threat", "Vulnerability", "Security"],
            correct: "A"
        },
        {
            question: "Q84. Backup data should be stored in the same location as the primary data.",
            options: ["True", "False"],
            correct: "B"
        },
        {
            question: "Q85. A ____ site is a fully equipped data center that allows an organization to resume operations immediately after a disaster.",
            options: ["Hot", "Warm", "Cold", "Remote"],
            correct: "A"
        },
        {
            question: "Q86. The RPO defines the maximum time period in which data might be lost from an IT service due to a major incident.",
            options: ["True", "False"],
            correct: "A"
        },
        {
            question: "Q87. Which type of backup is most likely to be used for critical data that changes frequently?",
            options: ["Full", "Incremental", "Continuous data protection", "Differential"],
            correct: "C"
        },
        {
            question: "Q88. ____ is the first step in developing a Disaster Recovery Plan.",
            options: ["Risk analysis", "Data backup", "Employee training", "Resource allocation"],
            correct: "A"
        },
        {
            question: "Q89. Data backups should be performed ____ to ensure minimal data loss.",
            options: ["Monthly", "Weekly", "Daily", "Continuously"],
            correct: "D"
        },
        {
            question: "Q90. Differential backups save more space than incremental backups.",
            options: ["True", "False"],
            correct: "B"
        },
        {
            question: "Q91. A backup solution that ensures no single point of failure is known as ____.",
            options: ["Mirroring", "Redundancy", "Data replication", "Backup rotation"],
            correct: "B"
        },
        {
            question: "Q92. The ____ backup strategy ensures that there are at least three copies of data stored on two different media types with one copy offsite.",
            options: ["2-1-1", "3-2-1", "4-3-2", "1-2-3"],
            correct: "B"
        },
        {
            question: "Q93. Data backup solutions should include both on-site and off-site components.",
            options: ["True", "False"],
            correct: "A"
        },
        {
            question: "Q94. Which of the following is a disadvantage of cloud backups?",
            options: ["Scalability", "Cost", "Accessibility", "Latency"],
            correct: "D"
        },
        {
            question: "Q95. Fill in the blank: ____ backups can be used to quickly restore a system to a previous state without losing any data.",
            options: ["Full", "Differential", "Snapshot", "Incremental"],
            correct: "C"
        },
        {
            question: "Q96. True or False: Backup encryption is optional and may be omitted to save time.",
            options: ["True", "False"],
            correct: "B"
        }
    ]
};
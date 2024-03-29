# Ethereum-based Healthcare Management System
The system mainly implements a patient-centric secure sharing platform for medical data, using smart contracts to achieve on-chain storage of data and access control for users. Our Ethereum system needs to store part of the patient's medical record data information and data index on the blockchain, and replace the original manual operation with smart contracts on the blockchain to ensure the authenticity of electronic medical records, develop the sharing of electronic medical records, and protect the privacy of patients as well as the security of data.
The system consists of the following six nodes.
- a) System. The system is responsible for generating keys for each node and storing and verifying information for the data sharing process.
- b) Patient. This is the owner of the medical data who can share their medical data by giving authorization to the data user and can revoke authorization to the data user at any time.
- c) Hospitals. This is the organization that generates the medical data and is responsible for uploading the patient's metadata to the blockchain.
- d) Data Users. This is the actor that requests medical data from the patient, usually a doctor or scientific institution, etc.
- e) Control Module. This is the interface for downloading data that is open to the public. The data user cannot illegally access the patient's medical data through the authentication of the control module.
- f) Regulator. It is responsible for issuing smart contracts and strictly limiting the nodes that apply to join the system. The regulator is responsible for publishing the deployment of smart contracts and strictly qualifying the nodes that apply to join the system.

These functions are to be implemented within our system: the back-end blockchain is able to store electronic medical record information and verify the authenticity of the information. Someone with access will be able to enter updated patient data on the front-end page and write it to the block, noting the address information written for the purpose of tracing the root cause. It will also be compatible with another system of Fabric for data sharing (more on this later in the cross-chain section). It also provides regulators with a service to manage and query electronic medical records.
For the deployment of a single chain in our project, four (at least four nodes to meet the basic requirements of fault tolerance of CBFT) computing nodes need to be placed separately, where nodes can be deployed on a case-by-case basis. A high-speed network is used for communication between the nodes. In the process of consistency voting on data blocks, this project uses the CBFT algorithm, thus ensuring that it can still operate normally when there is an error in one node.
In summary, the authenticity and reliability of the data needs to be ensured, using the control of smart contracts and the characteristics of the blockchain itself, while achieving tamper-proof, data sharing, multiple authorizations, and privacy protection for electronic medical records.
the results of compiling our smart contract and deploying it to test runs on the system. The experimental session was implemented through the Ethereum test network and software “ganache”. 
- The results of compiling our smart contract and deploying it to test runs on the system.

![image](https://user-images.githubusercontent.com/25323443/226366453-7bb82b4b-9460-46db-9c52-9e5d03059c39.png)
![image](https://user-images.githubusercontent.com/25323443/226366665-6dd760df-460d-4d33-adbe-5a239244615c.png)
![image](https://user-images.githubusercontent.com/25323443/226366674-baf40e55-5cc8-4cd9-8f44-e472df2ad754.png)
![image](https://user-images.githubusercontent.com/25323443/226366681-49b3a34d-5fc4-48b3-ad98-e35b5af11674.png)

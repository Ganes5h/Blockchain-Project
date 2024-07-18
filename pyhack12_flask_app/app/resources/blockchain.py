# from web3 import Web3
# import json

# # Ganache RPC Server URL
# ganache_url = "HTTP://127.0.0.1:7545"
# w3 = Web3(Web3.HTTPProvider(ganache_url))

# # Check connection
# print("Connected to Ganache HTTP provider:", w3.is_connected())

# # Load the contract ABI
# with open('CertificateStore.abi', 'r') as abi_file:
#     contract_abi = json.load(abi_file)

# # Contract address (replace with the address of your deployed contract)
# contract_address = "0x62084986a2454e0a852875c938956a36d6712CCd"

# # Create a contract instance
# contract = w3.eth.contract(address=contract_address, abi=contract_abi)


# def store_certificate_hash(certificate_hash):
#     try:
#         # Estimate gas before sending the transaction
#         gas_estimate = w3.eth.estimate_gas(transaction)

#         # Send the transaction with increased gas (optional but recommended)
#         tx_hash = contract.functions.storeCertificateHash(certificate_hash).transact({'gas': gas_estimate * 1.1})

#         # Wait for transaction receipt and handle errors
#         tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
#         if tx_receipt.status == 1:
#             return tx_receipt
#         else:
#             raise Exception("Transaction failed:", tx_receipt)

#     except Exception as e:
#         print(f"Error storing certificate hash: {e}")
#         return None


# def validate_certificate_hash(certificate_hash):
#     # Call the validateCertificateHash function on the contract
#     is_valid = contract.functions.validateCertificateHash(certificate_hash).call()
#     return is_valid


###########################################################################

# from web3 import Web3
# import json

# # Ganache RPC Server URL
# ganache_url = "HTTP://127.0.0.1:7545"
# w3 = Web3(Web3.HTTPProvider(ganache_url))

# # Check connection
# print("Connected to Ganache HTTP provider:", w3.is_connected())

# # Load the contract ABI
# with open('CertificateStore.abi', 'r') as abi_file:
#     contract_abi = json.load(abi_file)

# # Contract address (replace with the address of your deployed contract)
# contract_address = "0x62084986a2454e0a852875c938956a36d6712CCd"

# # Create a contract instance
# contract = w3.eth.contract(address=contract_address, abi=contract_abi)


# def store_certificate_hash(certificate_hash):
#     try:
#         account = w3.eth.accounts[0]  # Use the first account

#         # Build the transaction
#         txn = contract.functions.storeCertificateHash(certificate_hash).buildTransaction({
#             'from': account,
#             'nonce': w3.eth.getTransactionCount(account)
#         })

#         # Sign and send the transaction
#         signed_txn = w3.eth.account.sign_transaction(txn, private_key='YOUR_PRIVATE_KEY')
#         tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)

#         # Wait for the transaction receipt
#         tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
#         if tx_receipt.status == 1:
#             return tx_receipt
#         else:
#             raise Exception("Transaction failed:", tx_receipt)

#     except Exception as e:
#         print(f"Error storing certificate hash: {e}")
#         return None


# def validate_certificate_hash(certificate_hash):
#     # Call the validateCertificateHash function on the contract
#     is_valid = contract.functions.validateCertificateHash(certificate_hash).call()
#     return is_valid
from web3 import Web3
import json

# Ganache RPC Server URL
ganache_url = "HTTP://127.0.0.1:7545"
w3 = Web3(Web3.HTTPProvider(ganache_url))

# Check connection
print("Connected to Ganache HTTP provider:", w3.is_connected())

# Load the contract ABI
with open('CertificateStore.abi', 'r') as abi_file:
    contract_abi = json.load(abi_file)

# Contract address (replace with the address of your deployed contract)
contract_address = "0x37C383e8Cef4D6E34DD39aF91eD4C07A8aEB807a"

# Create a contract instance
contract = w3.eth.contract(address=contract_address, abi=contract_abi)

def store_certificate_hash(certificate_hash):
    try:
        # Use the provided account
        account = "0x9458cC8Bdcf072eeA7bf066B43FaF3bCAcc090A7"
        
        # Use the provided private key
        private_key = "0x8f40a507078a2343494c2eb5f1bddc89f7b56f2a29783a2bceda26af77f9ae49"
        
        # Verify that the private key corresponds to the account
        derived_account = w3.eth.account.from_key(private_key).address
        if derived_account != account:
            raise Exception(f"Private key does not match the account. Expected {account}, but got {derived_account}")
        
        # Build the transaction
        txn = contract.functions.storeCertificateHash(certificate_hash).build_transaction({
            'from': account,
            'nonce': w3.eth.get_transaction_count(account),
            'gas': 2000000,  # Adjust gas limit as necessary
            'gasPrice': w3.to_wei('20', 'gwei')  # Adjust gas price as necessary
        })
        
        # Sign the transaction
        signed_txn = w3.eth.account.sign_transaction(txn, private_key=private_key)
        
        # Send the transaction
        tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
        
        # Wait for the transaction receipt
        tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
        if tx_receipt.status == 1:
            return tx_receipt
        else:
            raise Exception("Transaction failed:", tx_receipt)
    except Exception as e:
        print(f"Error storing certificate hash: {e}")
        return None

def validate_certificate_hash(certificate_id, certificate_hash):
    try:
        # Call the getCertificate function to retrieve the stored hash
        stored_certificate = contract.functions.getCertificate(certificate_id).call()
        stored_hash = stored_certificate[5] if stored_certificate else None  # Index 5 is the certificate hash
        return stored_hash == certificate_hash
    except Exception as e:
        print(f"Error validating certificate hash: {e}")
        return False

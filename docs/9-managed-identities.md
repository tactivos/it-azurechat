# Using Managed Identities for Azure Chat Solution Accelerator

## Introduction

The Azure Chat Solution Accelerator powered by Azure OpenAI Service allows organizations to deploy a private chat tenant with enhanced security and control over their data. One of the new features is the support for [Managed Identities](https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview), adding a layer of security by eliminating the need for managing service principals and secrets through the application, and leveraging Azure's built-in role-based access controls.

### Security Advantages of Managed Identities

[**Managed Identities**](https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview) for Azure resources provide the following benefits:

1. **Improved Security**:

   - **No Secret Management**: Eliminates the need to manually store and manage credentials or keys.
   - **Automatic Rotation**: Managed Identities’ credentials are rotated automatically, eliminating potential security risk from non-rotated credentials.
   - **Scope Limited Access**: Access to Azure resources can be fine-grained, allowing least-privilege access policies.

2. **Simplified Management**:
   - **Platform Managed**: The Azure platform handles identity creation and lifecycle management.
   - **Simplified Resource Access**: Applications can request tokens to access resources without handling secrets.

## List of Services Using Managed Identities

The following services within the Azure Chat Solution Accelerator use Managed Identities for authentication:

1. **Azure OpenAI Service**
2. **Azure Cosmos DB**
3. **Azure AI Services (e.g., Document Intelligence, Azure OpenAI DALL-E)**
4. **Azure AI Search Service**
5. **Azure Storage Account**

> **Note:** Currently, due to compatibility issues, the Azure AI Speech Service does not utilize Managed Identities. There is no available documentation for using Entra ID authentication with the Speech Service, making it a `TODO` item.

## Preferred Production Deployment

Using Managed Identities is preferred for production deployments due to:

1. **Enhanced Security**: Eliminates risks associated with secret management such as accidental exposure or non-rotation of credentials.
2. **Compliance and Governance**: Managed Identities integrate with Azure's role-based access control (RBAC), facilitating easier audits and compliance management.
3. **Operational Efficiency**: Reduces the operational overhead of managing secrets, while also providing a more straightforward implementation.

### Deploy to Azure with Managed Identities

To deploy the application to Azure App Service with Managed Identities, follow the standard deployment instructions available in the [Deploy to Azure - GitHub Actions](https://github.com/microsoft/azurechat) section of the repository as follows:

1. **Update the Parameter**:
   - Set the parameter `disableLocalAuth` to `true` in [`infra/main.bicep`](/infra/main.bicep) (or [`infra/main.json`](/infra/main.json) for ARM deployment) to use Managed Identities.
2. **Deploy resources using azd**:
   - Refer to the [README](../README.md)

## Run Locally with Managed Identities
   
You can run Azure Chat locally with Managed Identities  - in this case the identity of the currently logged in user (via `az login`) is used to authenticate with the required Azure services. Follow the steps below to run Azure Chat locally with Managed Identities:

1. Refer to the documentation in [Run Locally](2-run-locally.md) to set up your local environment up for development.
1. Update your `.env` file with the following setting:
   ```
   USE_MANAGED_IDENTITIES=true
   ```
1. Make sure that your `.env` either has the following settings removed, uncommented, or set to empty. Even though you have set `USE_MANAGED_IDENTITIES=true` the various SDKs that the application uses to interact with these services can still default to key based authentication if these are present:
   ```
   AZURE_OPENAI_API_KEY=
   AZURE_OPENAI_DALLE_API_KEY=
   AZURE_COSMOSDB_KEY=
   AZURE_SEARCH_API_KEY=
   AZURE_DOCUMENT_INTELLIGENCE_KEY=
   ```
1. Run this script to grant yourself RBAC permissions on the various Azure resources used by Azure Chat. 

   If you haven't already done so then you will need to login to Azure using the Azure CLI command `az login`
   - In Powershell:
     ```powershell
     PS> .\scripts\add_localdev_roles.ps1
     ```
   - In Bash:
     ```bash
     > chmod +x .\scripts\add_localdev_roles.sh
     > .\scripts\add_localdev_roles.sh
     ```
    

## Conclusion

By leveraging Managed Identities, you enhance the security posture of your Azure Chat deployment while simplifying secret management and access control. This guide outlines the security advantages and highlights the necessary parameter changes to ensure a secure and efficient production setup. For more details, review the complete code and configurations available in the repository's `infra` directory.

🏁 [Back to README](../README.md)

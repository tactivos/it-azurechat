# 📘 Prerequisites

Please make sure the following prerequisites are in place prior to deploying this accelerator:

1. Setup GitHub or Entra ID for authentication:
   The [add an identity provider](./3-add-identity.md) section below shows how to configure authentication providers.

> [!NOTE]
> You can configure the authentication provider to your identity solution using [NextAuth providers](https://next-auth.js.org/providers/)

## 👋🏻 Introduction

_Azure Chat Solution Accelerator powered by Azure OpenAI Service_ is built using the following technologies:

- [Node.js 22](https://nodejs.org/en): an open-source, cross-platform JavaScript runtime environment.

- [Next.js 14](https://nextjs.org/docs): enables you to create full-stack web applications by extending the latest React features.

- [NextAuth.js](https://next-auth.js.org/): configurable authentication framework for Next.js.

- [OpenAI SDK](https://github.com/openai/openai-node) NodeJS library that simplifies building conversational UI.

- [Tailwind CSS](https://tailwindcss.com/): is a utility-first CSS framework that provides a series of predefined classes that can be used to style each element by mixing and matching.

- [shadcn/ui](https://ui.shadcn.com/): re-usable components built using Radix UI and Tailwind CSS.

- [Azure Cosmos DB](https://learn.microsoft.com/en-GB/azure/cosmos-db/nosql/): fully managed platform-as-a-service (PaaS) NoSQL database to store chat history.

- [Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-services/openai/overview): Azure OpenAI Service provides REST API access to OpenAI's powerful language models including the GPT-4, GPT-35-Turbo, and Embeddings model series.

- [Azure App Service](https://learn.microsoft.com/en-us/azure/app-service/): fully managed platform-as-a-service (PaaS) for hosting web applications, REST APIs, and mobile back ends.

### Optional Azure Services

The following Azure services can be deployed to expand the feature set of your solution:

- [Azure AI Document Intelligence](https://learn.microsoft.com/en-GB/azure/ai-services/document-intelligence/): an automated data processing system that uses AI and OCR to quickly extract text and structure from documents. We use this service for extracting information from documents.

- [Azure AI Search](https://learn.microsoft.com/en-GB/azure/search/): an AI-powered Platform-as-a-Service (PaaS) that helps developers build rich search experiences for applications. We use this service for indexing and retrieving information.

- [Azure OpenAI Embeddings](https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/embeddings?tabs=console): to embed content extracted from files prior to indexing and during retrieval (vector search).

- [Azure AI Speech](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/): speech recognition and generation with multi-lingual support and the ability to select and create custom voices.

# Solution Architecture

The following high-level diagram depicts the architecture of the solution accelerator:

![Architecture diagram](./images/architecture.png)

# Azure Deployment Costs

Pricing varies per region and usage, so it isn't possible to predict exact costs for your usage.
However, you can try the [Azure pricing calculator - Sample Estimate](https://azure.com/e/1f08b35661df4b5ea3663df112250b09) for the resources below.

- Azure App Service: Premium V3 Tier 1 CPU core, 4 GB RAM, 250 GB Storage. Pricing per hour. [Pricing](https://azure.microsoft.com/pricing/details/app-service/linux/)
- Azure OpenAI: Standard tier, ChatGPT and Embedding models. Pricing per 1K tokens used, and at least 1K tokens are used per question. [Pricing](https://azure.microsoft.com/en-us/pricing/details/cognitive-services/openai-service/)
- Azure AI Document Intelligence: SO (Standard) tier using pre-built layout. Pricing per document page, sample documents have 261 pages total. [Pricing](https://azure.microsoft.com/en-us/pricing/details/ai-document-intelligence/)
- Azure AI Search: Standard tier, 1 replica, free level of semantic search. Pricing per hour.[Pricing](https://azure.microsoft.com/pricing/details/search/)
- Azure Cosmos DB: Standard provisioned throughput with ZRS (Zone-redundant storage). Pricing per storage and read operations. [Pricing](https://azure.microsoft.com/en-us/pricing/details/cosmos-db/autoscale-provisioned/)
- Azure Monitor: Pay-as-you-go tier. Costs based on data ingested. [Pricing](https://azure.microsoft.com/pricing/details/monitor/)

To reduce costs, you can switch to free SKUs for Azure App Service, Azure AI Search, and Azure AI Document Intelligence by changing the parameters file under the `./infra` folder. There are some limitations to consider; for example, you can have up to 1 free Azure AI Search resource per subscription, and the free Azure AI Document Intelligence resource which only analyzes 500 pages for free each month. You can also reduce costs associated with the Azure AI Document Intelligence service by reducing the number of documents you upload.

> [!WARNING]
> To avoid unnecessary costs, remember to destroy your provisioned resources by deleting the resource group.

## Continue to the next step...

👉 [Next: Run Azure Chat Locally (development)](./2-run-locally.md)

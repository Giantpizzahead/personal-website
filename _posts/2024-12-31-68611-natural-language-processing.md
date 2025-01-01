---
title: '6.8611: Natural Language Processing'
description: A summary of MIT's natural language processing class.
image: assets/img/dallenlp.jpg
imagealt: DALL-E generated image of an NLP next word prediction factory.
---

Overview of natural language processing, focusing on modern deep learning methods.

## Code Links

To PyTorch code!

- [PyTorch Cheatsheet](https://colab.research.google.com/drive/1KJ5UQrNGAZjnvv9m7v9EVkZlhDmTdKlZ?usp=sharing)
-  [Homework Code Folder](https://drive.google.com/drive/folders/1jh2iKwB36wgPDSFFfsYEjVNNt639pc-m?usp=drive_link)
	- Tensors/DP review, LSA/TF-IDF, word2vec, RNN, seq2seq, perplexity/BLEU metrics, logits/constrained decoding/beam search
- [ARC Project Repo (Private)](https://github.com/Giantpizzahead/68611-nlp-project)

## Cheatsheet

The first half of the class had an exam: [Cheatsheet](https://docs.google.com/document/d/1_noD_9x1oFeKZcKK4Yc9mhD0Ohywl8cCyBTCypxSNqY/edit?usp=sharing)

## Outline

The second half of the class focused more on modern research. I'll note a very rough summary of each lecture here.

### 11. Doing (NLP) Research
Simplify the question, relax answer constraints, get the framing of the problem right, discuss with others/visualize. Research has 3 parts. A good question should result in large gains in knowledge, but must have a reasonable attack. Collaborators/different perspectives are monumental. The default is for your idea to fail - most research doesn't work. You should have alternate options. Will your research lead to better projects in the future? You can/should use programming assistant tools. Read papers in 3 passes. When you get stuck, collaborate or rethink the problem. Diversify projects if working on multiple. Communicate via papers, posters, talks, and other stuff. Paper writing is about clarity and telling your work's story. Start with writing the question and answer, then build around it. A good researcher is curious, resilient, reads quickly/carefully, conducts sound experiments, is thorough, and communicates well. Research projects can be about building, discovering, and/or explaining something. Look outside CS for inspiration. Keep going even after you think you've answered your main question!

### 12. Efficient Training and Inference
LoRA (Low-Rank Adapters) reparametrize existing weight matrices into two small, narrow rectangular ones. (Ex: 4096 x 4096 becomes 4096 x 8 * 8 x 4096) Reduces memory when fine-tuning, and seems to work well. Mixture-of-Experts (MoE) arranges lots of feed-forward layers in parallel, but only activates a few at a time. Does this with top k with some "match" score, along with load balancing. Models of this type are in the wild, but it's not clear what each expert specializes in. Quantization, number representations, approximating floats with ints for fast matrix multiplication. SmoothQuant paper to make dynamic range smaller for easier quantization. Quantization-aware training. TinyML class focuses on this.

In summary, there are 3 core techniques: Fine-tune a reduced set of parameters with low-rank adapters, predict with a subset of parameters on every forward pass using mixture-of-experts models, and quantize models to use lower-precision arithmetic after (or during) training.

### 13. Multimodality
Transformer encoders with contrastive learning / visual LMs are used for modern computer vision, and have many applications like image captioning/retrieval, visual question answering/dialog, and image generation. Diffusion models are used for image generation. Reasoning is still hard, but can be worked towards with generated code. Language and low-level actions can be combined, allowing planning with LMs (auto-formalization). Language learning helps vision.

### 14. Midterm Review
See cheatsheet.

### 15. Efficient Alternatives to Attention in Transformers
Prsented by Yoon Kim. Attention is slow (quadratic). Linear attention/transformers remove the softmax part of attention, allowing formulation as an RNN. Do something in between with chunkwise parallel form. Extensions with flash linear attention and gated linear attention, which are state-space models (like Mamba). Parallelize linear transformers with the delta rule over sequence length (DeltaNet). 

Takeaways:
- Linear attention removes the nonlinearity in softmax attention: RNN with matrix-valued hidden states.
- Chunkwise-parallel algorithm enables wallclock-efficient linear attention.
- Data-dependent gating factor improves performance of linear transformers.
- Gated linear attention Transformers are (scalable) SSMs.
- Some type of attention-like retrieval mechanism is likely necessary for good LLMs.
- Language is probably not the most impactful domain in which to explore subquadratic models.

### 16. NLP Engineering: Training LLMs from scratch
Prsented by Michael Krumdick. Strong evaluations are the most important part of LLM training. They should provide signal (low noise, high variance). Formatting makes a huge difference. Compute: Mean factor utilization (MFU). Costs are high. Inference - "Over-train" smaller models, dominant right now. Common model sizes are determined based on GPU size. Experimentation: Can take advantage of scaling laws to predict model performance, sometimes. Data is the most important factor for model behavior. Collecting/cleaning/filtering data is one of the most time-consuming efforts. Start with CommonCrawl if you need a large dataset. Model architecture is one of the least important parts - just use transformers. The training process is a lot like maintaining a web server.

Takeaways:

- Start with high-quality evaluations
- Experiment mostly with your data distribution
- Keep it simple and scalable

### 17. Interpretability in NLP
Presented by Aaron Mueller. Model interpretation is done with 3 different methods.

1.  Probing answers whether the model represents a feature in a given layer of neurons. It does this using a very small MLP that takes a layer's neurons as input, and tests the feasibility of predicting the target feature with only those neurons.
2.  Component attribution answers the question of what "weights" the model gives each input token when deciding what to output next - which tokens the model attends to. It does this by varying the input slightly over equidistant points (gradient w.r.t an input token), seeing how much the model output changes.
3.  Interventions are modeling changes that allow features in a model to be isolated, providing casual control of that feature by changing a specific neuron's activation. This works by incorporating sparse autoencoders into a model's architecture to isolate meaningful features into one neuron, then changing a neuron's activations to see if it causes a change in model output.

### 18. The Human Language Network & LLMs
Presented by Greta Tuckute. LLMs and the human brain share similarities. Find language in the brain using fMRI / other things. 4 key properties of the human language network: Functionally integrated, modality independent, dissociated from other cognitive abilities, and causally important for language. Many models of language processing today.

Model architecture:
- Many LLM architectures fit brain data well.
- Larger LLMs predict brain data better (plateau?).
- Larger LLMs become worse at predicting human language behavior (time to read each word).

Model behavior:
- Next-word prediction performance is positively correlated with brain alignment, but representational generality is too.
- Next-word prediction performance is negatively correlated with language behavior.

Model training:
- Fine-tuning can increase brain-LLM alignment (depending on the task).
- LLMs do align with brains after a developmentally plausible amount of training data.

LLMs can be used for decoding brain signals, simulation, and controlling neural responses (to a degree).

### 19. Automatic Speech Recognition
Presented by Jim Glass. Details on the anatomy of how speech is produced. Can be modeled as tubes of varying thickness. Speech can be represented as waveforms / discrete-time Fourier transforms (sampled at ~16kHz). Speech spectrograms visualize amount of frequencies present at specific times. Many classical speech recognition architectures exist. Neural network based ASR systems are dominant now, using attention. Listen, Attend, and Spell (LAS). Whisper encoder-decoder ASR based on transformers. Connectionist Temporal Classification (CTC), other methods. Self-supervised speech representation learning (fill in the blanks). Contrastive Predictive Coding (CPC). wav2vec (1.0 and 2.0), which is a CNN-based CPC. HuBERT is a popular speech representation in modern times. We need to find techniques that require less human annotations to break the speech recognition barrier.

### 20. Generative AI and Intellectual Property
Presented by Christopher Capozzola. Intellectual property, copyright, fair use, derivative/transformative works. The Authors Guild (independent union of writers/others). The pile has copyrighted work. Federal courts look at laws/regulations, plus precedents from previous court decisions. Past case: A gorilla took a selfie, so no human can copyright it. Also: Google books was allowed to scan digital copies, since this was a transformative work / fell under fair use. Other precedents. Possible outcomes of ongoing cases. Court of public opinion: Sometimes what matters is public discussion, not the case itself. Is generative AI a threat to copyright, or is copyright a threat to generative AI?

### 21. Structured Prediction with Classical Models
Presented by Jacob Andreas. Classical models still have use cases, but modern LLM-based approaches have taken over most. Hidden Markov Models (HMMs) and the Viterbi algorithm, which uses dynamic programming to compute the most likely walk in a Markov chain. Supervised training can be done with maximum likelihood estimates / raw counts. Unsupervised training can be done by maximizing expectations. Can use context free grammars (CFG) to make trees of syntax/semantics. Probabilistic grammars (PCFG) also exist.

### 22. The Factuality and Generalization Crisis of LLMs
Presented by Saadia Gabriel. LLMs don't always generalize, can amplify social biases, and hallucinate. IQ example: Implications of AI research. MisinfoEval to see how LLMs impact human decisions. Retrieval augmented generation (RAG) can mitigate some risks of hallucination. LLMs assume user demographic subgroups. LLMs can be used in healthcare, but prompt sensitivity affects fairness if not designed to mitigate it, and rigorous evaluation across subgroups is needed. Clinical LLM robustness can vary by hospital.

### 23. The Future of NLP
Pipelined NLP to seq2seq learning to Pretrain + Transfer to Pretrain + Prompt. You can learn rules of grammar, facts, and physical common sense from text. Transformers need scale to work. Time, data, money, and specialized expertise (for problem domains) are needed. Modern challenges: Truthfulness (retrieval-based LMs, better RLHF/interpretability/user interfaces), Controllability (better RLHF/interpretability, better data), Continual Learning (model editing, synthetic data generation/"mid-training"), Reasoning (auto-formalization/tool use, process supervision data, RL for chain-of-thought, variable-depth models), Interpretability (better foundations, automated tools), Scientific Discovery (analyze large scale model patterns / use interpretability tools, agents, just ask via prompting).

### 24. Project (ARC)
The Abstract Reasoning Corpus (ARC-AGI) is a challenge meant to test an AI's artificial general intelligence abilities. Each task has a few input/output examples on a 2D grid encapsulating a pattern, along with test(s) that need to be solved. Every task's pattern is different. We did ablations on the SOTA ARC prompt from Ryan Greenblatt (extended by Jeremy Berman [here](https://jeremyberman.substack.com/p/how-i-got-a-record-536-on-arc-agi)), and fed an LLM LARC descriptions of tasks to separate out pattern description and coding abilities. Due to limited budget, we didn't really get good quantitative results, which is expected because ARC is hard. State-of-the-art approaches use neural networks combined with smart program synthesis. Large scale LLMs don't work on the private test set, because they take too much compute time. Test-time fine-tuning does surprisingly well on ARC.

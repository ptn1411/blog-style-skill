#!/usr/bin/env python3
"""
AI Blog Style Skill - Search Script
Search through writing styles, tones, structures, and templates.
"""

import json
import os
import sys
from pathlib import Path

# Get the directory where this script is located
SCRIPT_DIR = Path(__file__).parent
DATA_DIR = SCRIPT_DIR.parent / "data"

def load_json(filename):
    """Load a JSON file from the data directory."""
    filepath = DATA_DIR / filename
    if filepath.exists():
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)
    return None

def search_styles(query):
    """Search writing styles."""
    data = load_json("writing-styles.json")
    if not data:
        return []
    
    query_lower = query.lower()
    results = []
    
    for style in data.get("styles", []):
        if (query_lower in style.get("name", "").lower() or
            query_lower in style.get("nameVi", "").lower() or
            query_lower in style.get("description", "").lower() or
            any(query_lower in c.lower() for c in style.get("characteristics", [])) or
            any(query_lower in b.lower() for b in style.get("bestFor", []))):
            results.append({
                "type": "style",
                "data": style
            })
    
    return results

def search_tones(query):
    """Search tone variations."""
    data = load_json("tone-variations.json")
    if not data:
        return []
    
    query_lower = query.lower()
    results = []
    
    for tone in data.get("tones", []):
        if (query_lower in tone.get("name", "").lower() or
            query_lower in tone.get("nameVi", "").lower() or
            query_lower in tone.get("description", "").lower()):
            results.append({
                "type": "tone",
                "data": tone
            })
    
    return results

def search_structures(query):
    """Search blog structures."""
    data = load_json("blog-structures.json")
    if not data:
        return []
    
    query_lower = query.lower()
    results = []
    
    for structure in data.get("structures", []):
        if (query_lower in structure.get("name", "").lower() or
            query_lower in structure.get("nameVi", "").lower() or
            any(query_lower in b.lower() for b in structure.get("bestFor", []))):
            results.append({
                "type": "structure",
                "data": structure
            })
    
    return results

def search_industries(query):
    """Search industry templates."""
    data = load_json("industry-templates.json")
    if not data:
        return []
    
    query_lower = query.lower()
    results = []
    
    for industry in data.get("industries", []):
        if (query_lower in industry.get("name", "").lower() or
            query_lower in industry.get("id", "").lower() or
            any(query_lower in t.lower() for t in industry.get("topics", [])) or
            any(query_lower in k.lower() for k in industry.get("keywords", []))):
            results.append({
                "type": "industry",
                "data": industry
            })
    
    return results

def search_blacklist(query):
    """Search marketing blacklist."""
    data = load_json("marketing-blacklist.json")
    if not data:
        return []
    
    query_lower = query.lower()
    results = []
    
    for category, info in data.get("categories", {}).items():
        if (query_lower in category.lower() or
            query_lower in info.get("description", "").lower() or
            any(query_lower in p.lower() for p in info.get("phrases", []))):
            results.append({
                "type": "blacklist",
                "category": category,
                "data": info
            })
    
    return results

def search_all(query):
    """Search across all data sources."""
    results = {
        "query": query,
        "styles": search_styles(query),
        "tones": search_tones(query),
        "structures": search_structures(query),
        "industries": search_industries(query),
        "blacklist": search_blacklist(query)
    }
    
    total = sum(len(v) for k, v in results.items() if isinstance(v, list))
    results["total"] = total
    
    return results

def format_results(results):
    """Format search results for display."""
    output = []
    output.append(f"\n🔍 Search Results for: '{results['query']}'")
    output.append(f"   Found {results['total']} matches\n")
    
    if results["styles"]:
        output.append("📝 Writing Styles:")
        for item in results["styles"]:
            style = item["data"]
            output.append(f"   • {style['name']} ({style['nameVi']})")
            output.append(f"     {style['description']}")
    
    if results["tones"]:
        output.append("\n🎭 Tones:")
        for item in results["tones"]:
            tone = item["data"]
            output.append(f"   • {tone['name']} ({tone['nameVi']})")
            output.append(f"     {tone['description']}")
    
    if results["structures"]:
        output.append("\n📋 Blog Structures:")
        for item in results["structures"]:
            structure = item["data"]
            output.append(f"   • {structure['name']} ({structure['nameVi']})")
            output.append(f"     Sections: {', '.join(structure['sectionsVi'])}")
    
    if results["industries"]:
        output.append("\n🏢 Industries:")
        for item in results["industries"]:
            industry = item["data"]
            output.append(f"   • {industry['name']}")
            output.append(f"     Topics: {', '.join(industry['topics'][:3])}...")
    
    if results["blacklist"]:
        output.append("\n🚫 Blacklist Categories:")
        for item in results["blacklist"]:
            output.append(f"   • {item['category']}: {item['data']['description']}")
    
    return "\n".join(output)

def main():
    if len(sys.argv) < 2:
        print("Usage: python search.py <query>")
        print("Example: python search.py tutorial")
        print("         python search.py saas")
        print("         python search.py friendly")
        sys.exit(1)
    
    query = " ".join(sys.argv[1:])
    results = search_all(query)
    
    if results["total"] == 0:
        print(f"\n❌ No results found for: '{query}'")
    else:
        print(format_results(results))
    
    # Also output JSON for programmatic use
    if "--json" in sys.argv:
        print("\n--- JSON Output ---")
        print(json.dumps(results, indent=2, ensure_ascii=False))

if __name__ == "__main__":
    main()

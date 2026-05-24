import { NextResponse } from 'next/server';
import { getProjects, getDevelopers } from '@/lib/db-helpers';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [projects, developers] = await Promise.all([
      getProjects(),
      getDevelopers(),
    ]);

    return NextResponse.json({
      success: true,
      projects,
      developers,
    });
  } catch (error: any) {
    console.error('Error fetching public projects:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch projects.',
    }, { status: 500 });
  }
}
